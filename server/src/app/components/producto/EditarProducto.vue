<template>
    <div>
        <h1>Editar Producto</h1>
        <form v-on:submit.prevent="editar">
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
      producto: {}
    };
  },
  created() {
    this.getProducto();
  },
  methods: {
    getProducto() {
      this.axios.get("/productos/" + this.$route.params.id).then(res => {
        this.producto = res.data;
      });
    },
    editar() {
      this.axios
        .patch("/productos/" + this.$route.params.id, {
          producto: this.producto
        })
        .then(res => {
          this.$router.replace({
            name: "MostrarProductos"
          });
        });
    }
  }
};
</script>
