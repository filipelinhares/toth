# toth
Styleguide generator that just work.

- [Demo](http://filipelinhares.github.io/toth-example/toth/)
- [Demo source](https://github.com/filipelinhares/toth-example)

## Installation
```sh
npm install --global toth
```

## CLI usage
#### new
```sh
toth new scss/*.scss
```
#### serve
```sh
toth serve
```
#### --port
```sh
toth serve --port 8080
```
#### --dir
```sh
toth new   --dir outputDir
toth serve --dir outputDir
```
## Styleguide documentation syntax

#### @cssurl and @jsurl
Load an external resource into your styleguide when compiled.
```scss
// @cssurl http://my-site/my-source-style.css
// @jsurl http://my-site/my-source-interaction.js
```

#### @name
Your component's name.
```scss
// @name Button
```
#### @description
Your component's description.
```scss
// @description My description lorem ipsum dolor sit a met
```
#### @state
Your component modifier, you need to follow these pattern `nome-do-modifier - descrição do modifier` with a dash between the name and the description.
```scss
// @state .small - A small button
```
#### @markup
The markup is used to build the code example and the element into your styleguide.
```scss
// @markup
	<button class="btn">I'm button</button>
```

## Contribute
Your contributions and suggestions are :heart: welcome.

#### Roadmap to 1.0
- [ ] Create the `toth watch` command
- [ ] Create a way to make custom themes
- [ ] Improves documentation
- [x] Improves default theme's code
- [x] Compile template in the back like Jekyll do
- [x] Add color palette support

## License
[MIT](LICENSE.md) © Filipe LInhares
