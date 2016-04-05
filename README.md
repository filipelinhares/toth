# toth
Styleguide generator that just work.

- [Demo](http://filipelinhares.github.io/toth-example/toth/)
- [Demo source](https://github.com/filipelinhares/toth-example)

### Content
 - [Installation](#installation)
 - [CLI usage](#cli-usage)
 - [Styleguide markup](#styleguide-markup)
 - [Custom themes](#custom-themes)

## Installation
```sh
npm install --global toth
```

## CLI usage

### Options
#### g, generate
```sh
toth generate css/*.css
```
#### s, server
```sh
toth server
```
#### w, watch
```sh
toth watch css/*.css
```

### Flags
#### -p, --port
```sh
toth server --port 8080
```
#### -d, --dir
```sh
toth generate --dir outputDir
toth server --dir outputDir
```
#### -t, --theme
```sh
toth generate scss/*.scss --theme {theme-folder or theme-package}
```
## Styleguide documentation syntax

#### @cssurl and @jsurl
Load an external resource into your styleguide when compiled.
```css
/*
 * @cssurl http://my-site/my-source-style.css
 * @jsurl http://my-site/my-source-interaction.js
 */
```

#### @name
Your component's name.
```css
// @name Button
```
#### @description
Your component's description.
```css
/*
 * @description My description lorem ipsum dolor sit a met
 */
```
#### @state
Your component modifier, you need to follow these pattern `nome-do-modifier - descrição do modifier` with a dash between the name and the description.
```css
/*
 * @state .small - A small button
 */
```
#### @markup
The markup is used to build the code example and the element into your styleguide.
```css
/* @markup
 *	<button class="btn">I'm button</button>
 */
```

#### @color
The markup is used to build the code example and the element into your styleguide.
```css
/*
 * @colors #fff - --variable-name
 */
```
## Custom themes
TODO: Add content

## Contribute
Your contributions and suggestions are :heart: welcome.

#### Roadmap to 1.0
- [x] Create the `toth watch` command
- [x] Create a way to make custom themes
- [x] Improves default theme's code
- [x] Compile template in the back like Jekyll do
- [x] Add color palette support
- [ ] Design a bealtiful [toth-default-theme](http://github.com/filipelinhares/toth-default-theme)
- [ ] Improves documentation

## License
[MIT](LICENSE.md) © Filipe LInhares
