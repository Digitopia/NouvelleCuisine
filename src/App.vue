<template>
  <div id="app">
    <div class="wrapper">
      <div class="container">
        <img class="image" src="img/logo.png" alt="" />
        <!-- <div class="image" src="img/logo.png" alt=""></div> -->
        <h1 class="title">Nouvelle Cuisine</h1>
        <div class="chefs">
          <table>
            <tr class="chef">
              <th>Chef</th>
              <td>{{ menu.chef }}</td>
            </tr>
            <tr class="subchef">
              <th>Subchef</th>
              <td>{{ menu.subchef }}</td>
            </tr>
          </table>
        </div>
        <div class="menu">
          <!-- <div class="accordion" id="accordion"> -->
          <div class="accordion" id="accordion">
            <!-- NOTE: this might use class "card" -->
            <div
              v-for="(dish, idx) in menu.dishes"
              :key="dish.type"
              class="dish"
            >
              <div
                data-toggle="collapse"
                :data-target="`#dish-${idx}`"
                aria-expanded="true"
                :aria-controls="`collapse-${idx}`"
                class="dish-header"
              >
                <div class="dish-type">{{ dish.type }}</div>
                <div class="dish-name">{{ dish.name }}</div>
                <CountryFlag
                  :country="dish.country"
                  size="normal"
                  class="dish-country"
                />
              </div>

              <div
                :id="`dish-${idx}`"
                class="collapse"
                :aria-labelledby="`dish-${idx}`"
                data-parent="#accordion"
              >
                <div class="card-body dish-text">
                  <p>{{ dish.text }}</p>
                  <img
                    preload
                    v-holder="'img=100px200?bg=f8f8f8&text=image goes here'"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="menu">
          <div v-for="dish in menu.dishes" :key="dish.type" class="dish">
            <div class="dish-type">{{ dish.type }}</div>
            <div class="dish-name">{{ dish.name }} - {{ dish.country }}</div>
            <div class="collapse">
              {{ dish.text }}
            </div>
          </div>
        </div> -->
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
      menu: {
        chef: 'Micheline',
        subchef: 'Michelão',
        dishes: [
          {
            type: 'sopa',
            name: 'Vichyssoise',
            text:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, beatae.',
            country: 'fr',
          },
          {
            type: 'entrada',
            name: 'Pastéis de Bacalhau',
            text:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, beatae.',
            country: 'pt',
          },
          {
            type: '1º Prato',
            name: 'Sushi',
            text:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, beatae.',
            country: 'jp',
          },
          {
            type: '2º Prato',
            name: 'Rodízio à Brasileira',
            text:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, beatae.',
            country: 'br',
          },
          {
            type: 'Sobremesa',
            name: 'Gelado de limão',
            text:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, beatae.',
            country: 'it',
          },
        ],
      },
    }
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
  background: url('/NouvelleCuisine/img/wall.jpg');
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
  max-width: 700px;
}

.wrapper {
  border-radius: 10px;
  margin: 30px 30px 0;
  padding: 30px 30px 0;
  background: #fff url('/img/bg.jpg');
  box-shadow: inset 0 0 0 16px #fff, inset 0 0 0 17px var(--accent),
    inset 0 0 0 18px #fff, inset 0 0 0 19px var(--accent), inset 0 0 0 20px #fff,
    inset 0 0 0 21px var(--accent);
}

.container {
  width: 90%;
}

.image {
  border-radius: 50%;
  width: 140px;
  margin: 20px auto;
  box-shadow: 0 0 0 3px #fff, 0 0 0 4px var(--accent), 0 0 0 5px #fff,
    0 0 0 6px var(--accent), 0 0 0 7px #fff, 0 0 0 8px var(--accent);
}

.title {
  font-weight: 700;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 26px;
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
  // margin: 30px 30px 0;
  // margin: 30px;
  padding: 10px 10px 30px;
}

.dish {
  position: relative;
  font-weight: bold;
  // margin-bottom: 35px;
  padding: 20px;
  // transition: all linear 0.1s;

  .dish-header {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
      // outline: 1px solid var(--accent);
    }
  }

  .dish-type {
    font-size: 1.2em;
    text-transform: uppercase;
  }
  .dish-name {
    font-weight: normal;
    font-size: 1.1em;
    // padding: 10px;
    line-height: 1em;
    color: #333;
  }

  .dish-country {
    position: absolute;
    right: 10px;
    top: 25px;
    // outline: 0.1px solid black;
  }

  .dish-text {
    background: rgba(213, 193, 154, 0.2);
    margin-top: 15px;
    &:hover {
      text-decoration: none !important;
    }
  }
}
</style>
