<template>
  <div id="app">
    <div class="wrapper">
      <div class="container">
        <img class="image" src="img/logo.png" alt="" />
        <h1 class="title">Nouvelle Cuisine</h1>
        <div class="chefs">
          <table>
            <tr class="chef">
              <th>Chef</th>
              <td>{{ chef }}</td>
            </tr>
            <tr class="subchef">
              <th>Subchef</th>
              <td>{{ subchef }}</td>
            </tr>
          </table>
        </div>
        <div class="menu">
          <div v-for="(dish, idx) in dishes" :key="dish.type" class="dish">
            <div
              data-toggle="modal"
              :data-target="`#dish-${idx}`"
              aria-expanded="true"
              :aria-controls="`collapse-${idx}`"
              class="dish-header"
            >
              <div class="dish-type">{{ dish.type }}</div>
              <div class="dish-name">{{ dish.name }}</div>
              <CountryFlag
                :country="dish.country"
                :size="flagSize"
                class="dish-country"
              />
            </div>

            <div
              class="modal fade"
              :id="`dish-${idx}`"
              tabindex="-1"
              role="dialog"
              :aria-labelledby="`dish-${idx}-title`"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" :id="`dish-${idx}-title`">
                      {{ dish.type }} - {{ dish.name }}
                      <CountryFlag
                        :country="dish.country"
                        class="dish-country-title"
                      />
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="card-body dish-text">
                      <p v-html="dish.text"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  name: 'app',

  components: {
    CountryFlag,
  },

  data() {
    return {
      chef: 'Micheline 👨🏻‍🍳',
      subchef: 'Michelão 👨🏻‍🍳',
      pratos: [
        'pratos/vichyssoise.html',
        'pratos/pasteis-bacalhau.html',
        'pratos/sushi.html',
        'pratos/rodizio.html',
        'pratos/gelado-limao.html',
      ],
      dishes: [],
      flagSize: 'big',
    }
  },

  async created() {
    window.addEventListener('resize', () => {
      this.resize()
    })

    for (var i = 0; i < this.pratos.length; i++) {
      const prato = this.pratos[i]
      const response = await fetch(prato)
      let data = await response.text()
      const el = document.createElement('html')
      el.innerHTML = data
      this.dishes.push({
        type: el.querySelector('meta[name="prato-type"]').content,
        name: el.querySelector('meta[name="prato-name"]').content,
        country: el.querySelector('meta[name="prato-country"]').content,
        text: el.querySelector('.prato-text').innerHTML,
      })
    }
  },

  mounted() {
    this.resize()
  },

  methods: {
    resize() {
      this.flagSize = window.innerWidth < 600 ? 'normal' : 'big'
    },
  },
}
</script>

<style lang="scss">
:root {
  --accent: #ffd333;
}

* {
  box-sizing: border-box;
}

html,
body {
  background: url('/nouvellecuisine/img/wall.jpg');
  background-repeat: repeat;
  background-size: cover;
  overflow-y: overlay;
}

#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  margin: 0 auto;
  max-width: 600px;
}

.wrapper {
  border-radius: 10px;
  margin: 20px 20px 0;
  padding: 20px 20px 0;
  background: #fff url('/nouvellecuisine/img/bg.jpg');
  box-shadow: inset 0 0 0 16px #fff, inset 0 0 0 17px var(--accent),
    inset 0 0 0 18px #fff, inset 0 0 0 19px var(--accent), inset 0 0 0 20px #fff,
    inset 0 0 0 21px var(--accent);
}

.container {
  width: 85%;
}

@media only screen and (max-width: 600px) {
  .container {
    width: 100%;
  }
  .menu {
    margin: 10px;
    padding: 5px !important;
  }
}

.image {
  border-radius: 50%;
  width: 10vmin;
  min-width: 70px;
  margin: 20px auto;
  box-shadow: 0 0 0 3px #fff, 0 0 0 4px var(--accent), 0 0 0 5px #fff,
    0 0 0 6px var(--accent), 0 0 0 7px #fff, 0 0 0 8px var(--accent);
}

.title {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 1.6rem;
  text-shadow: 1px 1px 0 #fff, 3px 3px 0 var(--accent);
}

.chefs {
  table {
    margin: 0 auto;
  }
  th {
    text-align: right;
    font-weight: normal;
  }
  td {
    text-align: left;
    padding-left: 5px;
  }
  .chef {
    font-size: 1em;
  }
  .subchef {
    font-size: 0.9em;
  }
}

.menu {
  border-top: 4px double black;
  margin: 30px 0;
  padding: 0.8em 0.8em 2em;
}

.dish {
  position: relative;
  text-align: center;
  margin: 0 auto;
  font-weight: bold;
  margin-bottom: 2em;
  .dish-header {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .dish-type {
    width: 100%;
    font-size: 1.1em;
    text-transform: uppercase;
  }
  .dish-name {
    font-weight: normal;
    font-size: 1em;
    // padding: 10px;
    line-height: 0.9em;
    color: #333;
  }

  .dish-country {
    position: absolute;
    top: -5px;
    right: 0;
    opacity: 0.8;
    border-radius: 2px !important;
  }

  .dish-text {
    font-weight: normal;
    text-align: left;
    &:hover {
      text-decoration: none !important;
    }
  }
}

.dish-country-title {
  position: relative;
  visibility: middle;
  top: 8px;
}

.modal-title {
  width: 100%;
  text-align: center;
}

pre {
  font-size: 0.8em;
}
</style>
