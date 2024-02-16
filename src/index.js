window.Webflow ||= [];
window.Webflow.push(() => {
  const display = document.querySelector(`[chordPro="display"]`);
  const songData = document.querySelector(`[chordPro="song"]`)?.innerHTML.replace(/<\/?p>/g, '\n');
  const transposeUp = document.querySelector(`[chordPro="transposeUp"]`);
  // console.log(transposeUp);
  const transposeDown = document.querySelector(`[chordPro="transposeDown"]`);
  const transposeLevel = document.querySelector(`[chordPro="transposeLevel"]`);
  // console.log(transposeLevel);
  const transpose = parseInt(transposeLevel.dataset.transpose) || 0;

  updateDisplay(songData, display, transpose);

  // EVENT LISTNERS
  transposeUp?.addEventListener('click', function (e) {
    e.preventDefault();
    const oldVal = parseInt(transposeLevel.dataset.transpose) || 0;
    const newVal = oldVal + 1;
    transposeLevel.dataset.transpose = newVal;

    const newText = (newVal > 0 ? '+' : '') + newVal;
    transposeLevel.innerHTML = newText;
    updateDisplay(songData, display, newVal);
  });

  transposeDown?.addEventListener('click', function (e) {
    e.preventDefault();
    const oldVal = parseInt(transposeLevel.dataset.transpose) || 0;
    const newVal = oldVal - 1;
    transposeLevel.dataset.transpose = newVal;
    const newText = (newVal > 0 ? '+' : '') + newVal;
    transposeLevel.innerHTML = newText;
    updateDisplay(songData, display, newVal);
  });

  // FUNCTIONS
  function parseChordPro(template, transpose) {
    const chordregex = /\[([^\]]*)\]/;
    const inword = /[a-z]$/;
    const buffer = [];
    const transpose_chord = function (chord, trans) {
      const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
      const regex = /([A-Z][b#]?)/g;

      const modulo = function (n, m) {
        return ((n % m) + m) % m;
      };

      return chord.replace(regex, function ($1) {
        if ($1.length > 1 && $1[1] == 'b') {
          if ($1[0] == 'A') {
            $1 = 'G#';
          } else {
            $1 = String.fromCharCode($1[0].charCodeAt() - 1) + '#';
          }
        }

        const index = notes.indexOf($1);
        if (index != -1) {
          return notes[modulo(index + trans, notes.length)];
        }
        return 'XX';
      });
    };

    if (!template) return '';

    template.split('\n').forEach(function (line, linenum) {
      if (line.match(/^#/)) {
        return '';
      }

      if (line.match(chordregex)) {
        if (!buffer.length) {
          buffer.push('<div class="lyric_block">');
        } else {
          buffer.push('</div><div class="lyric_block">');
        }

        let chords = '';
        let lyrics = '';
        let chordlen = 0;

        line.split(chordregex).forEach(function (word, pos) {
          let dash = 0;

          if (pos % 2 == 0) {
            lyrics = lyrics + word.replace(' ', '&nbsp;');

            if (word.match(inword)) {
              dash = 1;
            }

            if (word && word.length < chordlen) {
              chords = chords + '&nbsp;';
              lyrics = dash == 1 ? lyrics + '-&nbsp;' : lyrics + '&nbsp&nbsp;';

              for (let i = chordlen - word.length - dash; i != 0; i--) {
                lyrics = lyrics + '&nbsp;';
              }
            } else if (word && word.length == chordlen) {
              chords = chords + '&nbsp;';
              lyrics = dash == 1 ? lyrics + '-' : lyrics + '&nbsp;';
            } else if (word && word.length > chordlen) {
              for (let i = word.length - chordlen; i != 0; i--) {
                chords = chords + '&nbsp;';
              }
            }
          } else {
            const chord = word.replace(/[[]]/, '');
            if (transpose !== false) {
              chords =
                chords +
                '<span class="chord" data-original-val="' +
                chord +
                '">' +
                transpose_chord(chord, transpose) +
                '</span>';
            } else {
              chords =
                chords +
                '<span class="chord" data-original-val="' +
                chord +
                '">' +
                chord +
                '</span>';
            }

            chordlen = chord.length;
          }
        });

        buffer.push('<span class="chorProLine">' + chords + '<br/>\n' + lyrics + '</span>');
        return;
      }

      if (line.match(/^{.*}/)) {
        if (!buffer.length) {
          buffer.push('<div class="command_block">');
        } else {
          buffer.push('</div><div class="command_block">');
        }

        const matches = line.match(/^{(title|t|subtitle|st|comment|c|key):\s*(.*)}/i);
        if (matches && matches.length >= 3) {
          let command = matches[1];
          let text = matches[2];
          let wrap = '';

          switch (command) {
            case 'title':
            case 't':
              wrap = 'h1';
              break;
            case 'subtitle':
            case 'st':
              wrap = 'h4';
              break;
            case 'comment':
            case 'c':
              wrap = 'em';
              break;
            case 'key':
              wrap = 'span';
              text = `Key: ${text}`;
              command = 'key';
              break;
          }

          if (wrap) {
            buffer.push(`<${wrap} class="${command}">${text}</${wrap}>`);
          }
        }

        return;
      }

      buffer.push(line + '<br/>');
    });

    return buffer.join('\n');
  }
  function updateDisplay(chordProData, display, transpose) {
    const html = parseChordPro(chordProData, transpose);
    display.innerHTML = html;
  }
});
