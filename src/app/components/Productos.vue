<template lang="html">
<!-- <v-app id="mostrarProd"> -->
    <div>

        <v-container class="mt-2">
            <template>
                <v-card class="elevation-12">
                    <v-card-title row>
                        Productos
                        <v-flex xs3 sm2 md1 pl-2>
                            <v-btn fab small dark color="green" @click.stop="dialog = !dialog">
                                <v-icon>add</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs6 sm3 md3>
                            <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
                        </v-flex>
                    </v-card-title>
                    <v-data-table :headers="headersProducto" :items="productos" hide-actions :search="search">
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.index }}</td>
                            <td class="text-xs-left">{{ props.item.categoria }}</td>
                            <td class="text-xs-left">{{ props.item.codigo }}</td>
                            <td class="text-xs-left">{{ props.item.nombre }}</td>
                            <td class="text-xs-left">{{ props.item.descripcion }}</td>
                            <td class="text-xs-center">{{ props.item.precio }}</td>
                            <td class="text-xs-center">{{ props.item.stock }}</td>
                            <td class="justify-center layout px-0">
                                <v-btn flat icon color="teal" @click="editarId(props.item.codigo)">
                                    <v-icon dark>edit</v-icon>
                                </v-btn>
                                <v-btn flat icon color="red" @click="modalEliminar(props.item.codigo)">
                                    <v-icon dark>delete</v-icon>
                                </v-btn>
                            </td>
                        </template>
                        <v-alert slot="no-results" :value="true" color="error" icon="warning">
                            No se encontró ninguna coincidencia para "{{ search }}".
                        </v-alert>
                        <template slot="no-data">
                            <v-alert :value="true" color="warning" icon="warning">
                                No hay datos
                            </v-alert>
                        </template>
                    </v-data-table>
                </v-card>
            </template>
        </v-container>

        <!-- Modal Agregar/Editar -->
        <v-dialog v-model="dialog" width="800px" ref="form">
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    {{ nuevo ? "Nuevo Producto" : "Editar Producto" }}
                </v-card-title>
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>
                        <v-flex xs4>
                            <!-- <v-combobox v-model="selected" :items="categorias" dense item-text="nombre" item-value="idCategoria" prepend-icon="category" label="categorias">
                                {{ categorias.nombre }}
                            </v-combobox> -->
                            <v-select v-model="selected" :items="categorias" item-text="nombre" item-value="idCategoria" label="categorias" persistent-hint return-object single-line></v-select>
                        </v-flex xs4>
                        <v-text-field ref="codigo" label="Codigo" v-model="producto.codigo" :rules="rules.codigo" hint="13 números" prepend-icon="notes"></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field ref="nombre" label="Nombre" v-model="producto.nombre" :rules="rules.requerido" prepend-icon="notes"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field ref="descripcion" label="Descripción" v-model="producto.descripcion" :rules="rules.requerido" prepend-icon="notes"></v-text-field>
                        </v-flex>
                        <v-flex xs3>
                            <v-text-field ref="precio" type="number" label="Precio" prefix="$" v-model="producto.precio" :rules="rules.requerido" prepend-icon="notes"></v-text-field>
                        </v-flex>
                        <v-flex xs3>
                            <v-text-field ref="stock" label="Stock" v-model="producto.stock" mask="##########" :rules="rules.requerido" prepend-icon="notes"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-btn flat color="red" @click="cancelar()">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat color="green" @click="nuevo ? guardar() : editar()">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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
                <v-dialog v-model="dialogEliminar" persistent max-width="290">
                    <v-card>
                        <v-card-title class="headline">Eliminar esta categoría?</v-card-title>
                        <v-card-text>Si se elimina no se podrá restaurar despues.</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" flat @click.native="eliminar(false)">Cancelar</v-btn>
                            <v-btn color="red darken-1" flat @click.native="eliminar(true)">Eliminar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
        </template>

    </div>
<!-- </v-app> -->
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      dialogEliminar: false,
      eliminarId: "",
      mensaje: "",
      colorSnack: "",
      snackbar: false,
      timeout: 5000,
      drawer: null,
      nuevo: true,
      search: "",
      productos: [],
      headersProducto: [
        {
          text: "#",
          align: "left",
          //   sortable: false,
          value: "index"
        },
        {
          text: "Categoria",
          align: "left",
          value: "categoria"
        },
        {
          text: "Codigo",
          align: "left",
          value: "codigo"
        },
        {
          text: "Nombre",
          align: "left",
          value: "nombre"
        },
        {
          text: "Descripción",
          align: "left",
          value: "descripcion"
        },
        {
          text: "Precio",
          align: "center",
          value: "precio"
        },
        {
          text: "Stock",
          align: "center",
          value: "stock"
        },
        {
          text: "Acciones",
          align: "center",
          sortable: false,
          value: "acciones"
        }
      ],
      producto: {},
      selected: {
        nombre: "",
        idCategoria: ""
      },
      categorias: [],
      rules: {
        codigo: [val => (val || "").length == 13 || "Codigo de 13 números"],
        requerido: [val => (val || "").length > 0 || "Campo requerido"],
        stock: [val => Number.isInteger(val) || "Valor entero"]
      }
    };
  },
  computed: {
    form() {
      return {
        codigo: this.address,
        nombre: this.nombre,
        descripcion: this.city,
        precio: this.state,
        stock: this.zip
      };
    }
  },
  watch: {
    dialog: function() {
      if (!this.dialog) {
        this.nuevo = true;
        this.producto = {};
        this.categorias = [];
        this.selected = {
          nombre: "Seleccione una categoría",
          idCategoria: "1"
        };
        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset();
        });
      } else {
        this.getCategorias();
      }
    }
  },
  created() {
    this.getProductos();
  },
  methods: {
    getProductos() {
      this.axios
        .get("/productos")
        .then(res => {
          //   this.productos = res.data;
          this.productos = [];
          let cont = 0;
          res.data.forEach(element => {
            this.productos.push({
              index: res.data.length - cont,
              categoria: element.categoria.nombre,
              codigo: element.codigo,
              nombre: element.nombre,
              descripcion: element.descripcion,
              precio: element.precio,
              stock: element.stock
            });
            cont++;
          });
        })
        .catch(err => {
          this.mensaje = err.response.data.msg;
          this.colorSnack = "red darken-4";
          this.snackbar = true;
        });
    },
    guardar() {
      if (this.selected.nombre == "") {
        this.mensaje = "Debe seleccionar una categoría";
        this.colorSnack = "red darken-4";
        this.snackbar = true;
      } else {
        this.producto.idCategoria = this.selected.idCategoria;
        this.axios
          .post("/productos", {
            producto: this.producto
          })
          .then(res => {
            this.dialog = false;
            this.getProductos();
          })
          .catch(err => {
            this.mensaje = err.response.data.msg;
            this.colorSnack = "red darken-4";
            this.snackbar = true;
          });
      }
    },
    modalEliminar(id, ind) {
      this.eliminarId = id;
      this.dialogEliminar = true;
    },
    eliminar(respuesta) {
      this.dialogEliminar = false;
      if (respuesta) {
        this.axios
          .delete("/productos/" + this.eliminarId)
          .then(res => {
            this.getProductos();
            this.eliminarId = "";
            this.mensaje = "Eliminación exitosa";
            this.colorSnack = "red darken-4";
            this.snackbar = true;
          })
          .catch(err => {
            this.mensaje = err.response.data.msg;
            this.colorSnack = "red darken-4";
            this.snackbar = true;
          });
      } else {
        this.eliminarId = "";
      }
    },
    editarId(id) {
      this.axios
        .get("/productos/" + id)
        .then(res => {
          this.producto = res.data;
          this.selected.idCategoria = this.producto.categoria.idCategoria;
          this.dialog = true;
          this.nuevo = false;
        })
        .catch(err => {
          this.mensaje = err.response.data.msg;
          this.colorSnack = "red darken-4";
          this.snackbar = true;
        });
    },
    editar() {
      this.axios
        .patch("/productos/" + this.producto.codigo, {
          producto: this.producto
        })
        .then(res => {
          this.dialog = false;
          this.getProductos();
        })
        .catch(err => {
          this.mensaje = err.response.data.msg;
          this.colorSnack = "red darken-4";
          this.snackbar = true;
        });
    },
    cancelar() {
      this.dialog = false;
    },
    getCategorias() {
      this.axios
        .get("/categorias")
        .then(res => {
          this.categorias = res.data;
          //   this.categorias.push({
          //     nombre: "Selecciona una categoria",
          //     idCategoria: "1"
          //   });
        })
        .catch(err => {
          this.mensaje = err.response.data.msg;
          this.colorSnack = "red darken-4";
          this.snackbar = true;
        });
    }
  }
};
</script>
