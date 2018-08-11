<template lang="html">
<div>
    <form v-on:submit.prevent="crearProducto" class="card">
        <div class="card-title">
            <h1>Nuevo Producto</h1>
        </div>
        <div class="card-body">
            <div class="form-group">
                <select v-model="selected" class="form-control">
                  <option v-for="categoria in categorias" v-bind:value="categoria.idCategoria">
                    {{ categoria.nombre }}
                  </option>
                </select>
            </div>

            <div class="form-group">
                <input type="text" v-model="producto.codigo" placeholder="Codigo de barras" class="form-control">
            </div>
            <div class="form-group">
                <input type="text" v-model="producto.nombre" placeholder="Nombre del producto" class="form-control">
            </div>
            <div class="form-group">
                <input type="text" v-model="producto.descripcion" placeholder="descripción del producto" class="form-control">
            </div>
            <div class="form-group">
                <input type="text" v-model="producto.stock" placeholder="stock de entrada" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary">
                    Crear
                </button>
        </div>
    </form>
</div>
</template>

<script>
export default {
  data() {
    return {
      producto: {
        codigo: "",
        nombre: "",
        descripcion: "",
        stock: ""
      },
      selected: "1",
      categorias: {}
    };
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
          this.categorias.push({
            nombre: "Selecciona una categoria",
            idCategoria: "1"
          });
        })
        .catch(err => {
          alert(err.response.data.msg);
        });
    },
    crearProducto() {
      console.log(this.selected);
      this.producto.idCategoria = this.selected;
      this.axios
        .post("/productos", {
          producto: this.producto
        })
        .then(res => {
          this.$router.replace({
            name: "MostrarProductos"
          });
        })
        .catch(err => alert(err.response.data.msg));
    }
  }
};
</script>
