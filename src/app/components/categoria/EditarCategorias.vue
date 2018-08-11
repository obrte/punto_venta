<template>
    <div>
        <h1>Editar Categoria</h1>
        <form v-on:submit.prevent="editar">
            <div class="form-group">
                <input type="text" v-model="categoria.nombre" class="form-control">
            </div>
            <div class="form-group">
                <input type="text" v-model="categoria.descripcion" class="form-control">
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
            categoria: {}
        };
    },
    created() {
        this.getCategoria();
    },
    methods: {
        getCategoria() {
            this.axios.get("/categorias/" + this.$route.params.id)
                .then(res => {
                    this.categoria = res.data;
                });
        },
        editar() {
            this.axios
                .patch("/categorias/" + this.$route.params.id, {
                    categoria: this.categoria
                })
                .then(res => {
                    this.$router.replace({
                        name: "MostrarCategorias"
                    });
                });
        }
    }
};
</script>
