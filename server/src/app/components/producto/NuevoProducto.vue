<template lang="html">
<div>

    <form v-on:submit.prevent="crearCategoria" class="card">
        <div class="card-title">
            <h1>Nueva Categoria</h1>
        </div>
        <div class="card-body">
            <div class="form-group">
                <input type="text" v-model="producto.codigo" placeholder="Codigo de barras" class="form-control">
            </div>
            <div class="form-group">
                <input type="text" v-model="producto.nombre" placeholder="Nombre de la categoria" class="form-control">
            </div>
            <div class="form-group">
                <input type="text" v-model="producto.descripcion" placeholder="descripción de la categoria" class="form-control">
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
            }
        };
    },
    methods: {
        crearProducto() {
            console.log(this.categoria)
            this.axios
                .post("/productos", {
                    producto: this.producto
                })
                .then(res => {
                    this.$router.replace({
                        name: "MostrarProductos"
                    });
                })
                .catch(err => console.log(err));
        }
    }
};
</script>
