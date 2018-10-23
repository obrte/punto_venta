<template lang="html">
<!-- <v-app id="mostrarProd"> -->
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
    <v-container ref="imprimir" class="invisible" style="height:200px;">
        <h3 class="display-3 invisible">SALIDA</h3>
        <table class="impcss">
            <thead>
                <tr>
                    <th class="numero titulo titulo-imp">#</th>
                    <th class="cantidad titulo titulo-imp">Cantidad</th>
                    <th class="nombre titulo titulo-imp">Nombre</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(articulo, index) in carrito" class="renglon">
                    <td class="numero">{{index}}</td>
                    <td class="cantidad">{{articulo.cantidad}}</td>
                    <td class="nombre">{{articulo.nombre}}</td>
                </tr>
            </tbody>
        </table>
    </v-container>

</div>
<!-- </v-app> -->
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
      ],
      cssTabla: `
              table.impcss {
                font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
                border-collapse: collapse;
                width: 600px;
              }

              td.titulo,
              th.titulo {
                border: 1px solid #616161;
                padding: 8px;
                text-align: center;
              }

              td.numero,
              th.numero {
                border: 1px solid #616161;
                padding: 8px;
                text-align: center;
                width: 30px;
              }

              td.cantidad,
              th.cantidad {
                border: 1px solid #616161;
                padding: 8px;
                text-align: center;
                width: 40px;
              }

              td.nombre,
              th.nombre {
                border: 1px solid #616161;
                padding: 8px;
                text-align: center;
                width: 40px;
              }

              tr.renglon:nth-child(even) {
                background-color: #EEEEEE;
              }

              th.titulo-imp {
                padding-top: 12px;
                padding-bottom: 12px;
                text-align: center;
                background: #BDBDBD;
                font-weight: bold;
              }
              `
    };
  },
  computed: {},
  mounted() {
    const { Printd } = window.printd;
    this.d = new Printd();
  },
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
        this.d.print(comprobante, this.cssTabla);
        this.dialogImprimir = false;
        this.carrito = [];
      } else {
        this.dialogImprimir = false;
      }
    }
  }
};
</script>
