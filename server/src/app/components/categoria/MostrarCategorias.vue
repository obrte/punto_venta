<template lang="html">
<div>
    <h3>Categorias</h3>
    <div class="container">
        <router-link :to="{ name: 'NuevaCategoria'}" class="btn btn-primary mb-2">
            Nueva
        </router-link>
    </div>
    <table class="table table-hover table-bordered table-sm shadow p-3 mb-5 bg-white rounded">
        <thead>
            <tr class="bg-secondary text-white text-center">
                <th class="border-dark">#</th>
                <th class="border-dark">Nombre</th>
                <th class="border-dark">Descripción</th>
                <th class="border-dark">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(categoria, index) in categorias">
                <td class="text-center">{{index + 1}}</td>
                <td>{{categoria.nombre}}</td>
                <td class="text-justify">{{categoria.descripcion}}</td>
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
</div>
</template>

<script>
export default {
    data() {
        return {
            categorias: []
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
                  console.log(res.data, 'RESP')
                    if (res.data.status == 'Alerta') {
                        alert(res.data.msg)
                    } else {
                        this.categorias = res.data
                    }
                })
                .catch(err => console.log(err, 'ERROR'));
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
            this.$router.replace({
                name: "EditarCategoria",
                params: {
                    id: id
                }
            });
        }
    }
};
</script>
