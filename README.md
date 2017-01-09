# Glot-API

A glot.io API wrapper with nice utilities.

## Installation

```
npm install --save glot-api
```

## Usage

```js
import GlotAPI from 'glot-api'

const glot = new GlotAPI('optional-token') // If you are logged in you will find your token here: https://glot.io/account/token.

glot.snippets({ limit: 200 }) // handle pagination automatically
.then((snippets) => {
  return glot.runSnippet(snippets[0])
})
```

## API

All methods return a Promise.

### Languages
* `glot.languages()` - *https://github.com/prasmussen/glot-run/blob/master/api_docs/list_languages.md*
* `glot.languageVersions(language)` - *https://github.com/prasmussen/glot-run/blob/master/api_docs/list_versions.md*

### Snippets
* `glot.snippets({ limit, owner, language })` - *https://github.com/prasmussen/glot-snippets/blob/master/api_docs/list_snippets.md*
* `glot.createSnippet(data)` - *https://github.com/prasmussen/glot-snippets/blob/master/api_docs/create_snippet.md*
* `glot.getSnippet(snippet)` - *https://github.com/prasmussen/glot-snippets/blob/master/api_docs/get_snippet.md*
* `glot.updateSnippet(snippet, data)` - *https://github.com/prasmussen/glot-snippets/blob/master/api_docs/update_snippet.md*
* `glot.deleteSnippet(snippet)` - *https://github.com/prasmussen/glot-snippets/blob/master/api_docs/delete_snippet.md*

### Run
* `glot.run(language, [version,] files)` - *https://github.com/prasmussen/glot-run/blob/master/api_docs/run.md*
* `glot.runSnippet(snippet)` - *https://github.com/prasmussen/glot-run/blob/master/api_docs/run.md*

## License

MIT
