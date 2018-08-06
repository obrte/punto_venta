<template lang="html">
    <div>
        <h1>Bodega</h1>
        <router-link :to="{ name: 'MostrarCategorias'}" class="btn btn-primary">
            Categorias
        </router-link>
        <router-link :to="{ name: 'MostrarProductos'}" class="btn btn-primary">
            Productos
        </router-link>
            <div class="container">
                <router-view></router-view>
            </div>
    </div>
</template>

<script>
export default {};
</script>