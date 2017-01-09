const _axios = require('axios')

module.exports = function (token) {
  const headers = {}
  if (token) {
    headers.Authorization = 'Token ' + token
  }
  var axios = _axios.create({
    headers: headers
  })

  function run (language, version, files) {
    if (Array.isArray(version)) {
      files = version
      version = undefined
    }
    return axios.post('https://run.glot.io/languages/' + language + '/' + (version || 'latest'), {
      data: {
        files: files
      }
    }).then(function (res) {
      return res.data
    })
  }

  return {
    languages () {
      return axios.get('https://run.glot.io/languages').then(function (res) {
        return res.data
      })
    },
    languageVersions (language) {
      return axios.get('https://run.glot.io/languages/' + language).then(function (res) {
        return res.data
      })
    },
    run: run,
    snippets (options) {
      const params = []
      options = options || {}
      if (!options.limit) {
        options.limit = 100
      }
      if (options.limit < 100) {
        params.push('per_page=' + options.limit)
      }
      if (options.owner) {
        params.push('owner=' + options.owner)
      }
      if (options.language) {
        params.push('language=' + options.language)
      }
      var page = 1
      var snippets = []
      function getSnippets () {
        return axios.get('https://snippets.glot.io/snippets?' + (params.concat('page=' + page).join('&')))
        .then(function (res) {
          snippets = snippets.concat(res.data)
          page += 1
          if (snippets.length < options.limit && res.headers.link && res.headers.link.indexOf('rel="next"') !== -1) {
            return getSnippets()
          }
          return snippets
        })
      }
      return getSnippets()
    },
    createSnippet (params) {
      return axios.post('https://snippets.glot.io/snippets', {
        data: params
      }).then(function (res) {
        return res.data
      })
    },
    getSnippet (snippet) {
      return axios.get('https://snippets.glot.io/snippets/' + (snippet.id || snippet)).then(function (res) {
        return res.data
      })
    },
    updateSnippet (snippet, params) {
      return axios.get('https://snippets.glot.io/snippets/' + (snippet.id || snippet), {
        data: params
      }).then(function (res) {
        return res.data
      })
    },
    deleteSnippet (snippet) {
      return axios.delete('https://snippets.glot.io/snippets/' + (snippet.id || snippet)).then(function (res) {
        return res.data
      })
    },
    runSnippet (snippet) {
      if (snippet.files && snippet.language) {
        return run(snippet.language, snippet.files)
      }
      return axios.get('https://snippets.glot.io/snippets/' + (snippet.id || snippet)).then(function (res) {
        return res.data
      }).then(function (res) {
        return run(res.language, res.files)
      })
    }
  }
}
