<template lang="html">
<div>
    <h1>Bodega</h1>
    <div class="container">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <router-link :to="{ name: 'MostrarCategorias'}" :class="catActivo">
                    Categorias
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'MostrarProductos'}" :class="prodActivo">
                    Productos
                </router-link>
            </li>
        </ul>
    </div>
    <div class="container">
        <router-view></router-view>
    </div>

</div>
</template>

<script>
export default {
    data() {
        return {
            catActivo: 'nav-link',
            prodActivo: 'nav-link'
        };
    },
    methods: {
        tabSelect(tab) {
            if (tab == 'categoria') {
                catActivo = 'nav-link activo',
                    prodActivo = 'nav-link'
            } else {
                prodActivo = 'nav-link activo',
                    catActivo = 'nav-link'
            }
        }
    }
};
</script>
