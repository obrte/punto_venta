<template>
  <div>
    <h1>Editar Producto</h1>
    <form v-on:submit.prevent="editar">
      <div class="form-group">
        <select v-model="selected" class="form-control">
          <option v-for="categoria in categorias" :value="categoria.idCategoria">
            {{ categoria.nombre }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <input type="text" v-model="producto.codigo" class="form-control">
      </div>
      <div class="form-group">
        <input type="text" v-model="producto.nombre" class="form-control">
      </div>
      <div class="form-group">
        <input type="text" v-model="producto.descripcion" class="form-control">
      </div>
      <div class="form-group">
        <input type="text" v-model="producto.stock" class="form-control">
      </div>

      <button type="submit" name="btnEdit" class="btn btn-primary">
        Guardar
      </button>
    </form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            producto: {},
            selected: "1",
            categorias: {}
        };
    },
    created() {
        this.getProducto()
        this.getCategorias()
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
        getProducto() {
            this.axios.get("/productos/" + this.$route.params.id)
                .then(res => {
                    this.producto = res.data
                    this.selected = this.producto.idCategoria
                })
                .catch(err => {
                    alert(err.response.data.msg);
                });
        },
        editar() {
            this.producto.idCategoria = this.selected;
            this.axios
                .patch("/productos/" + this.$route.params.id, {
                    producto: this.producto
                })
                .then(res => {
                    this.$router.replace({
                        name: "MostrarProductos"
                    });
                })
                .catch(err => {
                    alert(err.response.data.msg);
                });
        }
    }
};
</script>
