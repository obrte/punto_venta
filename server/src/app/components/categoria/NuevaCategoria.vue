<template lang="html">
<div>

    <form v-on:submit.prevent="crearCategoria" class="card">
        <div class="card-title">
            <h1>Nueva Categoria</h1>
        </div>
        <div class="card-body">
            <div class="form-group">
                <input type="text" v-model="categoria.nombre" placeholder="Nombre de la categoria" class="form-control">
            </div>
            <div class="form-group">
                <input type="text" v-model="categoria.descripcion" placeholder="descripción de la categoria" class="form-control">
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
            categoria: {
                nombre: "",
                descripcion: ""
            }
        };
    },
    methods: {
        crearCategoria() {
            console.log(this.categoria)
            this.axios
                .post("/categorias", {
                    categoria: this.categoria
                })
                .then(res => {
                    this.$router.replace({
                        name: "MostrarCategorias"
                    });
                })
                .catch(err => console.log(err));
        }
    }
};
</script>
