# Notate Chord Pro

Notate Chord Pro uses **_Attributes_** to read and then display your ChordPro Notation.
This was designed to be used with **_Webflow_** Attributes but can be used in any HTML File.

## Table of Contents

- [Demo](#demo)
- [Acknowledgments](#acknowledgements)
- [Features](#features)
- [Roadmap](#roadmap)
- [Installation](#installation)
- [Attributes](#attributes)

## Demo

[www.scroll-chords.webflow.io](https://scroll-chords.webflow.io/songs/psalm-5110-12-5c413)

## Acknowledgements

- This was modiied from an open source codePen file, and adapted for use in webflow. Orginal sorce: https://codepen.io/Arden/pen/ZqxjLW

## Features

- Read chordPro Notation https://www.chordpro.org/
- Instant Transposing

## Roadmap

    - Ability to set class name attributes for customizable css styles

## Installation

Add the script below to the body of your HTML file of the page that has the attributes.

```bash
<script defer src="http://localhost:3000/index.js"></script>
```

## Attributes

To run this project, you will need to add the following attributes to your HTML elements.

\* = requied

### \* **display**

The display is where the final generated notation will be displayed.

**placment:** Any div or text element.

**Attribute name**: `chordPro`

**Attribute value:**`display`

```bash
chordPro="display"
```

<hr>

### \* **song**

The song attribute retrieves the innerHTML of the element that contans the chordPro Notation

Notation should be regular multilined text or a Rich Text Element

_Example of Notation:_

`{title: How Deep The Father's Love For Us}`

`{Key: D}`

`{comment: verse 1}`

`[D]How Deep the [G]father's Love for Us`

**placment:** Any div or text element.

**Attribute name**: `chordPro`

**Attribute value:**`song`

```bash
chordPro="song"
```

<hr>

### **transpose**

Notate chordPro has the ability to transpose your notation. This feature would require you have up and down trigers and a display.

For quick start you can copy and paste this HTML example.
_Template HTML:_

```bash
<div>
    <a href="#" chordPro="transposeDown">
        <i class="fa fa-chevron-down"></i>
        <span>⬇</span></a>
        <span chordPro="transposeLevel" data-transpose="0">0</span>
        <a href="#" chordPro="transposeUp">
        <i class="fa fa-chevron-up"></i>
        <span>⬆</span>
    </a>
</div>
```

There are 3 attributes for this feature to work:

`chordPro="transposeDown"` - This is the clickable button / trigger for transposing down

**placment:** Any clickable element

`chordPro="transposeUp"`- This is the clickable button / trigger for transposing up

**placment:** Any clickable element

`chordPro="transposeLevel"`- This is the text display of the transpostion.

**placment:** Any text / span element.
