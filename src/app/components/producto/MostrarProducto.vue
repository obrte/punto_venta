<template lang="html">
<div>
    <h3>Productos</h3>
    <div class="container">
        <router-link :to="{ name: 'NuevoProducto'}" class="btn btn-primary mb-2">
            Nuevo
        </router-link>

    </div>
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
                            <i class="fas fa-times-circle btn btn-danger mx-1" title="Eliminar Producto" @click="eliminarProducto(producto.codigo, index)" />
                            <!-- Boton Editar -->
                            <i class="fas fa-edit btn btn-info" title="Editar Producto" @click="editarProducto(producto.codigo)" />
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
            productos: []
        };
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
        eliminarProducto(id, ind) {
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
        editarProducto(id) {
            this.$router.replace({
                name: "EditarProducto",
                params: {
                    id: id
                }
            });
        }
    }
};
</script>
