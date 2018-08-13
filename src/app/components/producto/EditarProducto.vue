<template>
    <div>
        <form v-on:submit.prevent="editar" class="card">
            <div class="card-title ml-4">
                <h1>Editar Producto</h1>
            </div>
            <div class="card-body">
                <div class="form-row">
                    <div class="col-md-3 mb-3">
                        <label class="ml-3">Categoria</label>
                        <select v-model="selected" class="form-control">
                            <option v-for="categoria in categorias" v-bind:value="categoria.idCategoria">
                                {{ categoria.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="col-md-3 mb-3 mx-1">
                        <label class="ml-3">Codigo de barras</label>
                        <input type="text" v-model="producto.codigo" placeholder="Codigo de barras 13 digitos" class="form-control">
                    </div>
                    <div class="col-md-3 mb-3">
                        <label class="ml-3">Nombre</label>
                        <input type="text" v-model="producto.nombre" placeholder="Nombre del producto" class="form-control">
                    </div>
                    <div class="col-md-2 mb-3">
                        <label class="ml-3">Precio</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text">$</div>
                            </div>
                            <input type="text" v-model="producto.precio" placeholder="precio" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="ml-3">Descripción</label>
                    <textarea type="text" v-model="producto.descripcion" placeholder="descripción del producto" class="form-control" />
                </div>
                <div class="form-row">
                    <div class="col-md-2 mb-3 mx-1">
                        <label class="ml-3">Stock</label>
                        <input type="text" v-model="producto.stock" placeholder="stock de entrada" class="form-control">
                    </div>
                </div>
                <div class="form-row">
                    <button type="submit" class="btn btn-primary">
                        Guardar
                    </button>
                    <router-link :to="{ name: 'MostrarProductos'}" class="btn btn-danger ml-3">
                        Cancelar
                    </router-link>
                </div>
            </div>
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
