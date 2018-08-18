<template lang="html">
<v-app id="mostrarProd">
    <div>
        <v-btn fab color="green" dark fixed @click.stop="dialog = !dialog" class="m-2">
            <v-icon>add</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" width="800px" ref="form">
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    {{ nuevo ? "Nuevo Producto" : "Editar Producto" }}
                </v-card-title>
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>
                        <v-flex xs4>
                            <v-combobox v-model="selected" :items="categorias" dense item-text="nombre" item-value="idCategoria" prepend-icon="category" label="categorias">
                                {{ categorias.nombre }}
                            </v-combobox>
                        </v-flex xs4>
                            <v-text-field ref="codigo" label="Codigo" v-model="producto.codigo" :rules="rules.codigo" prepend-icon="notes"></v-text-field>
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

        <v-container class="mt-5">
            <table class="table table-hover table-bordered table-sm shadow p-3 mb-5 bg-white rounded">
                <thead>
                    <tr class="bg-secondary text-white text-center">
                        <th class="border-dark">#</th>
                        <th class="border-dark">Categoria</th>
                        <th class="border-dark">Codigo</th>
                        <th class="border-dark">Nombre</th>
                        <th class="border-dark">Descripción</th>
                        <th class="border-dark">Precio</th>
                        <th class="border-dark">Stock</th>
                        <th class="border-dark">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(producto, index) in productos">
                        <td class="text-center">{{index + 1}}</td>
                        <td>{{producto.categoria.nombre}}</td>
                        <td>{{producto.codigo}}</td>
                        <td>{{producto.nombre}}</td>
                        <td class="text-justify">{{producto.descripcion}}</td>
                        <td>{{"$" + producto.precio}}</td>
                        <td>{{producto.stock}}</td>
                        <td>
                            <div class="row justify-content-center align-items-center mx-1">
                                <div class="d-flex">
                                    <!-- Boton Eliminar -->
                                    <i class="fas fa-times-circle btn btn-danger mx-1" title="Eliminar Producto" @click="eliminar(producto.codigo, index)" />
                                    <!-- Boton Editar -->
                                    <i class="fas fa-edit btn btn-info" title="Editar Producto" @click="editarId(producto.codigo)" />
                                </div>
                            </div>
                        </td>
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
      dialog: false,
      drawer: null,
      nuevo: true,
      productos: [],
      producto: {},
      selected: {
        nombre: "Seleccione una categoría",
        idCategoria: "1"
      },
      categorias: [],
      rules: {
        codigo: [val => (val || "").length == 13 || "Codigo de 13 digitos"],
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
        if (this.nuevo) {
          this.getCategorias();
        }
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
          this.productos = res.data;
        })
        .catch(err => {
          alert(err.response.data.msg);
        });
    },
    guardar() {
      if (this.selected.idCategoria == 1) {
        alert("Debe seleccionar una categoría");
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
          .catch(err => alert(err.response.data.msg));
      }
    },
    eliminar(id, ind) {
      const respuesta = confirm(
        "Estas seguro que deseas eliminar este Producto?"
      );
      if (respuesta) {
        this.axios
          .delete("/productos/" + id)
          .then(res => this.productos.splice(ind, 1))
          .catch(err => alert(err.response.data.msg));
      }
    },
    editarId(id) {
      this.axios.get("/productos/" + id).then(res => {
        this.producto = res.data;
        this.dialog = true;
        this.nuevo = false;
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
        .catch(err => alert(err.response.data.msg));
    },
    cancelar() {
      this.dialog = false;
    },
    getCategorias() {
      this.axios
        .get("/categorias")
        .then(res => {
          this.categorias = res.data;
          this.categorias.push({
            nombre: "Selecciona una categoria",
            idCategoria: "1"
          });
        })
        .catch(err => {
          alert(err.response.data.msg);
        });
    }
  }
};
</script>
