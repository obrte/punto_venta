<template>
<v-app id="inspire">
    <v-navigation-drawer clipped fixed v-model="drawer" app>
        <v-list dense>
            <v-list-tile @click="ruta('Test')">
                <v-list-tile-action>
                    <v-icon large color="deep-orange">forward</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Categorias</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title v-if="windowSize.w > 800">Menu</v-toolbar-title>
        <v-divider class="mx-3 pr-5" inset vertical v-if="windowSize.w > 800"></v-divider>
        <v-flex sm4 md3 pl-2 ml-2 v-if="windowSize.w > 700">
            <v-toolbar-title>Metodos Númericos</v-toolbar-title>
        </v-flex>
        <v-toolbar-title v-text="'METODO'"></v-toolbar-title>
        <v-spacer></v-spacer>
        <span>Restaurar</span>
        <v-btn icon color="pink darken-4">
            <v-icon>refresh</v-icon>
        </v-btn>

    </v-toolbar>
    <v-content>
            <router-view></router-view>
    </v-content>
    <v-footer app fixed>
        <span>&copy; 2018 Bracamonte</span>
    </v-footer>
</v-app>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    menu: "",
    windowSize: {
      w: 0,
      h: 0
    },
    drawer: true,
    items: [
      {
        icon: "airline_seat_recline_extra",
        "icon-alt": "airline_seat_recline_normal",
        text: "Catalogos",
        model: false,
        children: [
          {
            text: "Categorias",
            link: "Categorias"
          },
          {
            text: "Productos",
            link: "Productos"
          }
        ]
      },
      {
        icon: "local_grocery_store",
        text: "Salidas",
        link: "Salidas"
      }
    ]
  }),
  watch: {
    menu: function() {
      router.push(this.menu);
    }
  },
  methods: {
    ruta(ruta) {
      this.$router.replace({
        name: ruta
      });
    },
    onResize() {
      this.windowSize = {
        w: window.innerWidth,
        h: window.innerHeight
      };
    }
  },
  props: {
    source: String
  }
};
</script>
