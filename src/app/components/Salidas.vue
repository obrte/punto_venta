<template lang="html">
<v-app id="mostrarProd">
    <div>
        <v-container class="mt-2">
            <template>
                <v-card class="elevation-12">
                    <v-card-title row>
                        Salida
                        <v-flex xs10 sm4 md4 pl-3>
                            <v-text-field ref="lector" label="Codigo" v-model="agregar" prepend-icon="add_shopping_cart" @keyup.native.enter="cantidadArticulo"></v-text-field>
                        </v-flex>

                        <v-spacer></v-spacer>
                        <v-flex xs3 sm2 md1 pl-2>
                            <v-btn fab large flat color="teal" @click="dialogImprimir = true" :disabled="!impr">
                                <v-icon>print</v-icon>
                            </v-btn>
                        </v-flex>

                    </v-card-title>
                    <v-data-table :headers="headersCarrito" :items="carrito" hide-actions>
                        <template slot="items" slot-scope="props">
                            <td>{{ props.index + 1 }}</td>
                            <td class="text-xs-left">{{ props.item.cantidad }}</td>
                            <td class="text-xs-left">{{ props.item.nombre }}</td>
                            <td class="text-xs-center">{{ props.item.stock }}</td>
                            <td class="justify-center layout px-0">
                                <v-btn flat icon color="red" @click="quitar(props.index)">
                                    <v-icon dark>delete</v-icon>
                                </v-btn>
                            </td>
                        </template>
                        <template slot="no-data">
                            <v-alert :value="true" color="warning" icon="warning">
                                Carrito limpio
                            </v-alert>
                        </template>
                    </v-data-table>
                </v-card>
            </template>
        </v-container>

        <!-- snackbar -->
        <v-snackbar v-model="snackbar" :color="colorSnack" :timeout="timeout" right top multi-line>
            {{ mensaje }}
            <v-btn icon dark @click="snackbar = false">
                <v-icon>clear</v-icon>
            </v-btn>
        </v-snackbar>

        <!-- Modal Eliminar -->
        <template>
            <v-layout row justify-center>
                <v-dialog v-model="dialogImprimir" persistent max-width="290">
                    <v-card>
                        <v-card-title class="headline">Confirmar salida de articulos?</v-card-title>
                        <!-- <v-card-text>Si se elimina no se podrá restaurar despues.</v-card-text> -->
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" flat @click.native="imprimir(false)">Regresar</v-btn>
                            <v-btn color="green darken-1" flat @click.native="imprimir(true)">Confirmar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
        </template>

        <!-- Imprimir -->
        <v-container ref="imprimir" class="ticket invisible" style="height:200px;">
            <h3 class="display-3 invisible">TICKET</h3>
            <table>
                <thead>
                    <tr>
                        <th class="numero">#</th>
                        <th class="cantidad">Cantidad</th>
                        <th class="nombre">Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(articulo, index) in carrito">
                        <td class="numero">{{index}}</td>
                        <td class="cantidad">{{articulo.cantidad}}</td>
                        <td class="nombre">{{articulo.nombre}}</td>
                    </tr>
                </tbody>
            </table>
        </v-container>

    </div>
</v-app>
</template>

<script>
export default {
  data() {
    return {
      dialogImprimir: false,
      eliminarId: "",
      mensaje: "",
      colorSnack: "",
      snackbar: false,
      timeout: 5000,
      nuevo: true,
      search: "",
      dialog: false,
      impr: false,
      drawer: null,
      agregar: "",
      cantidad: "1",
      separado: [],
      carrito: [],
      granTotal: 0.0,
      headersCarrito: [
        {
          text: "#",
          align: "left",
          sortable: false,
          value: "index"
        },
        {
          text: "Cantidad",
          align: "left",
          value: "categoria"
        },
        {
          text: "Nombre",
          align: "left",
          value: "nombre"
        },
        {
          text: "Stock",
          align: "center",
          value: "nombre"
        },
        {
          text: "Quitar",
          align: "center",
          sortable: false,
          value: "acciones"
        }
      ]
    };
  },
  computed: {},
  watch: {
    // agregar: function() {
    //   if (this.agregar.indexOf("*") != -1) {
    //     this.separado = this.agregar.split("*");
    //     if (this.separado[1].length == 13) {
    //       this.cantidad = this.separado[0];
    //       this.agregarCarrito(this.separado[1]);
    //     }
    //   } else {
    //     if (this.agregar.length == 13) {
    //       this.agregarCarrito(this.agregar);
    //     }
    //   }
    // },
    carrito: function() {
      if (this.carrito.length > 0) {
        this.impr = true;
      } else {
        this.impr = false;
      }
    }
  },
  created() {},
  methods: {
    quitar(ind) {
      this.carrito.splice(ind, 1);
    },
    cantidadArticulo() {
      if (this.agregar != "") {
        if (this.agregar.indexOf("*") != -1) {
          this.separado = this.agregar.split("*");
          this.cantidad = this.separado[0];
          this.agregarCarrito(this.separado[1]);
        } else {
          this.agregarCarrito(this.agregar);
        }
      }
    },
    agregarCarrito(id) {
      if (id) {
        this.axios
          .get("/productos/" + id)
          .then(res => {
            this.carrito.push({
              nombre: res.data.nombre,
              cantidad: this.cantidad,
              stock: res.data.stock
            });
            this.agregar = "";
            this.cantidad = "1";
          })
          .catch(err => {
            this.mensaje = "Articulo no registrado.";
            this.colorSnack = "amber";
            this.snackbar = true;
          });
      } else {
        this.mensaje = "Codigo incorrecto.";
        this.colorSnack = "amber";
        this.snackbar = true;
      }
    },
    cancelar() {
      this.dialog = false;
    },
    imprimir(respuesta) {
      if (respuesta) {
        var comprobante = this.$refs["imprimir"];

        var ventimp = window.open(" ", "popimpr");
        ventimp.document.write(comprobante.innerHTML);
        ventimp.document.close();
        ventimp.print();
        ventimp.close();
        this.dialogImprimir = false;
      } else {
        this.dialogImprimir = false;
      }
    }
  }
};
</script>
