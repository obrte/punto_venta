<template lang="html">
<div>
    <h1 class="container">Almacen</h1>
    <div class="container">
        <ul class="nav nav-tabs">
            <li class="nav-item" @click="tabSelect('categorias')">
                <router-link :to="{ name: 'MostrarCategorias'}" :class="catActivo">
                    Categorias
                </router-link>
            </li>
            <li class="nav-item" @click="tabSelect('productos')">
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
            if (tab == 'categorias') {
                this.catActivo = 'nav-link bg-secondary text-white active',
                this.prodActivo = 'nav-link'
            } else {
                this.prodActivo = 'nav-link bg-secondary text-white active',
                this.catActivo = 'nav-link'
            }
        }
    }
};
</script>
