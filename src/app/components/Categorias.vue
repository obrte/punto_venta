<template lang="html">
<v-app id="mostrarCat">
    <div>
        <v-btn fab color="green" dark fixed @click.stop="dialog = !dialog" class="m-2">
            <v-icon>add</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" width="800px">
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    {{ nuevo ? "Nueva Categoria" : "Editar Categoria" }}
                </v-card-title>
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-text-field v-model="categoria.nombre" prepend-icon="category" placeholder="Nombre de la categoria"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="categoria.descripcion" prepend-icon="notes" placeholder="Descripción de la categoria"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-btn flat color="red" @click="cancelar()">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat color="green" @click="nuevo ? crearCategoria() : editar()">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-container class="mt-5">
            <table class="table table-hover table-bordered table-sm shadow p-3 mb-5 bg-white rounded">
                <thead>
                    <tr class="bg-secondary text-white text-center">
                        <th class="border-dark">#</th>
                        <th class="border-dark">Nombre</th>
                        <th class="border-dark">Descripción</th>
                        <th class="border-dark">Productos</th>
                        <th class="border-dark">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(categoria, index) in categorias">
                        <td class="text-center">{{index + 1}}</td>
                        <td>{{categoria.nombre}}</td>
                        <td class="text-justify">{{categoria.descripcion}}</td>
                        <td>{{categoria.productos.length}}</td>
                        <td>
                            <div class="row justify-content-center align-items-center mx-1">
                                <div class="d-flex">
                                    <!-- Boton Eliminar -->
                                    <i class="fas fa-times-circle btn btn-danger mx-1" title="Eliminar Producto" @click="eliminarCategoria(categoria.idCategoria, index)" />
                                    <!-- Boton Editar -->
                                    <i class="fas fa-edit btn btn-info" title="Editar Producto" @click="editarCategoria(categoria.idCategoria)" />
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
      categorias: [],
      categoria: []
    };
  },
  watch: {
    dialog: function() {
      if (!this.dialog) {
        this.nuevo = true;
        this.categoria = [];
      }
    }
  },
  created() {
    this.getCategorias();
  },
  methods: {
    getCategorias() {
      this.axios
        .get("/categorias")
        .then(res => {
          this.categorias = res.data;
        })
        .catch(err => {
          alert(err.response.data.msg);
        });
    },
    crearCategoria() {
      this.axios
        .post("/categorias", {
          categoria: this.categoria
        })
        .then(res => {
          this.$router.replace({
            name: "MostrarCategorias"
          });
          this.dialog = false;
          this.getCategorias();
        })
        .catch(err => console.log(err));
    },
    eliminarCategoria(id, ind) {
      const respuesta = confirm(
        "Estas seguro que deseas eliminar esta Categoria?"
      );
      if (respuesta) {
        this.axios
          .delete("/categorias/" + id)
          .then(res => {
            this.categorias.splice(ind, 1);
          })
          .catch(err => console.log(err));
      }
    },
    editarCategoria(id) {
      this.axios.get("/categorias/" + id).then(res => {
        this.categoria = res.data;
        this.dialog = true;
        this.nuevo = false;
      });
    },
    editar() {
      this.axios
        .patch("/categorias/" + this.categoria.idCategoria, {
          categoria: this.categoria
        })
        .then(res => {
          this.dialog = false;
          this.getCategorias();
        });
    },
    cancelar() {
      this.dialog = false;
    }
  }
};
</script>
