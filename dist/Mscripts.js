let pokemonRepository = (function () {
  let e = [],
    t = [{ url: 'https://pokeapi.co/api/v2/pokemon/?limit=200', offset: 0 }],
    n = t[0]
  function o () {
    return t
  }
  function a (e) {
    return e + ' m'
  }
  function r (e) {
    return e + ' kg'
  }
  function i () {
    console.log('Loading...'), console.time('Rendered')
  }
  function l () {
    console.timeEnd('Rendered')
  }
  function d (t) {
    'object' == typeof t && 'name' in t && 'detailsUrl' in t && 'id' in t
      ? e.push(t)
      : console.log('pokemon cannot be pushed to pokemonList')
  }
  function s () {
    return (
      i(),
      fetch(n.url)
        .then(function (e) {
          return e.json()
        })
        .then(function (e) {
          let t = n.offset + 1
          e.results.forEach(function (e) {
            d({ name: e.name, detailsUrl: e.url, id: t }), (t += 1)
          }),
            l()
        })
        .catch(function (e) {
          l(), console.error(e)
        })
    )
  }
  function c () {
    return e
  }
  function p (e) {
    return (
      i(),
      fetch(e.detailsUrl)
        .then(function (e) {
          return e.json()
        })
        .then(function (t) {
          ;(e.imageUrl = t.sprites.front_default),
            (e.id = t.id),
            (e.height = t.height),
            (e.weight = t.weight),
            (e.types = t.types),
            2 === t.types.length
              ? ((e.types[0] = t.types[0].type.name),
                (e.types[1] = t.types[1].type.name))
              : (e.types[0] = t.types[0].type.name),
            l()
        })
        .catch(function (e) {
          l(), console.error(e)
        })
    )
  }
  document
    .querySelector('#searchForm')
    .addEventListener('submit', function (e) {
      e.preventDefault()
    })
  function u (e) {
    p(e).then(function () {
      $(document.querySelector('body')).addClass('modal-open')
      let t = document.querySelector('.modal-container')
      $(t)
        .addClass('modal fade show')
        .attr('aria-labelledby', 'Pokemon details')
        .attr('aria-hidden', 'true')
        .attr('role', 'dialog')
        .attr('aria-modal', 'true')
        .attr('style', 'display: block;')
        .html('')
      let n = document.createElement('div')
      $(n).attr('role', 'document').addClass('modal-dialog')
      let o = document.createElement('div')
      $(o).addClass('modal-content')
      let i = document.createElement('button')
      $(i)
        .addClass('modal-close close')
        .attr('data-dismiss', 'modal')
        .attr('aria-label', 'close')
        .attr('type', 'button')
        .on('click', function () {
          m(),
            $(t)
              .removeClass('show')
              .removeAttr('aria-modal')
              .attr('style', 'display: none;')
        })
      let l = document.createElement('span')
      $(l).attr('aria-hidden', 'true').text('Close')
      let d = document.createElement('h1')
      d.innerText = `${e.name.charAt(0).toUpperCase()}${e.name.slice(1)} #${
        e.id
      }`
      let s = document.createElement('img')
      s.src = e.imageUrl
      let c = document.createElement('p')
      e.types.length > 1
        ? (c.innerText = `Height: ${a(e.height)}
          Weight: ${r(e.weight)}
          Types: ${e.types[0]}, ${e.types[1]}`)
        : (c.innerText = `Height: ${a(e.height)}
          Weight: ${r(e.weight)}
          Type: ${e.types[0]}`),
        i.appendChild(l),
        o.appendChild(i),
        o.appendChild(d),
        o.appendChild(s),
        o.appendChild(c),
        n.appendChild(o),
        t.appendChild(n),
        t.addEventListener('click', function (e) {
          e.target === t && m()
        })
    })
  }
  function m () {
    $(document.querySelector('.modal-container'))
      .removeClass('modal fade')
      .removeAttr('aria-labelledby')
      .removeAttr('aria-hidden')
      .removeAttr('role')
      .removeAttr('style')
    $(document.querySelector('.modal-backdrop')).remove()
    $(document.querySelector('body')).removeAttr('class')
  }
  function h (e) {
    let t = document.querySelector('.pokemon-list'),
      n = document.createElement('li'),
      o = document.createElement('button')
    ;(o.innerText = `#${e.id} ${e.name.charAt(0).toUpperCase()}${e.name.slice(
      1
    )}`),
      $(o)
        .addClass('list-button btn btn-primary')
        .attr('type', 'button')
        .attr('data-toggle', 'modal')
        .attr('data-target', '.modal-container'),
      o.addEventListener('click', function () {
        u(e)
      }),
      $(n).addClass('list-group-item'),
      n.appendChild(o),
      t.appendChild(n)
  }
  return (
    document
      .querySelector('#searchInput')
      .addEventListener('input', function e () {
        let t = document.querySelector('#searchInput').value.toLowerCase()
        document.querySelectorAll('.list-group-item').forEach(function (e) {
          e.querySelector('.list-button').innerText.toLowerCase().includes(t)
            ? (e.style.display = 'block')
            : (e.style.display = 'none')
        })
      }),
    window.addEventListener('keydown', function (e) {
      let t = document.querySelector('.modal-container')
      'Escape' === e.key && t.classList.contains('show') && m()
    }),
    {
      getAllApi: o,
      addNavItem: function e (t) {
        let n = document.querySelector('.navbar-nav'),
          o = document.createElement('li'),
          a = document.createElement('button')
        $(a)
          .addClass('nav-link btn btn-link')
          .text('Resources')
          .on('click', function () {
            window.location.href = 'https://pokedex.org/'
          }),
          $(o).addClass('nav-item'),
          o.appendChild(a),
          n.appendChild(o)
      },
      changeApi: function t (o) {
        ;(e = []), (n = o)
        $(document.querySelector('.pokemon-list')).html(''),
          s().then(function () {
            e.forEach(function (e) {
              h(e)
            })
          })
      },
      showLoadingMessage: i,
      hideLoadingMessage: l,
      add: d,
      loadList: s,
      getAllPokemon: c,
      loadDetails: p,
      showDetails: u,
      hideDetails: m,
      addListItem: h
    }
  )
})()
pokemonRepository.getAllApi().forEach(function (e) {
  pokemonRepository.addNavItem(e)
}),
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAllPokemon().forEach(function (e) {
      pokemonRepository.addListItem(e)
    })
  })