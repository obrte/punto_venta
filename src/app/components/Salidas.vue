<template lang="html">
<v-app id="mostrarProd">
    <div>
        <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
                </v-flex xs6>
                <v-text-field ref="lector" label="Codigo" v-model="agregar" :rules="rules.numero" prepend-icon="notes"></v-text-field>
                </v-flex>
            </v-layout>
        </v-container>
        <v-flex xs4>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">Total: ${{ granTotal }}</h3>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-btn fab color="deep-orange" dark fixed @click.stop="dialog = !dialog" class="m-2">
            <v-icon>local_atm</v-icon>
        </v-btn>
        <v-container>
            <table class="table table-hover table-bordered table-sm shadow p-3 mb-5 bg-white rounded">
                <thead>
                    <tr class="bg-secondary text-white text-center">
                        <th class="border-dark">#</th>
                        <th class="border-dark">Articulo</th>
                        <th class="border-dark">Cantidad</th>
                        <th class="border-dark">Precio Unitario</th>
                        <th class="border-dark">Total</th>
                        <th class="border-dark">Quitar Articulo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(articulo, index) in carrito">
                        <td class="text-center">{{index + 1}}</td>
                        <td>{{articulo.nombre}}</td>
                        <td>{{articulo.cantidad}}</td>
                        <td>{{"$" + articulo.precioUnitario}}</td>
                        <td>{{"$" + articulo.total}}</td>
                        <td>
                            <div class="row justify-content-center align-items-center mx-1">
                                <div class="d-flex">
                                    <!-- Boton Eliminar -->
                                    <i class="fas fa-times-circle btn btn-danger mx-1" title="Quitar articulo" @click="quitar(index)" />
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </v-container>

        <v-dialog v-model="dialog" width="500px" ref="form">
            <v-card>
                <v-card-title class="grey lighten-4 py-4 title">
                    COBRANDO
                </v-card-title>
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>
                        </v-flex xs6>
                        <v-text-field ref="efectivo" type="number" label="Efectivo" v-model="efectivo" prepend-icon="attach_money"></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field ref="cambio" type="number" label="Cambio" v-model="cambio" prepend-icon="attach_money"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-actions>
                    <v-btn flat color="red" @click="cancelar()">Cancelar
                        <v-icon right dark>cancel</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat color="green" @click="imprimir()">Cobrar
                        <v-icon right dark>local_printshop</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-container ref="imprimir" class="ticket invisible" style="height:200px;">
            <h3 class="display-3 invisible">TICKET</h3>
            <table>
                <thead>
                    <tr>
                        <th class="cantidad">CANT</th>
                        <th class="producto">PRODUCTO</th>
                        <th class="precio">$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(articulo, index) in carrito">
                        <td class="producto">{{articulo.cantidad}}</td>
                        <td class="cantidad">{{articulo.nombre}}</td>
                        <td class="precio">{{"$" + articulo.precioUnitario}}</td>
                    </tr>
                    <tr>
                        <td>Total: ${{ granTotal }}</td>
                    </tr>
                    <tr>
                        <td>Efectivo: ${{ efectivo }}</td>
                    </tr>
                    <tr>
                        <td>Cambio: ${{ cambio }}</td>
                    </tr>
                </tbody>
            </table>
        </v-container>
    </div>
</v-app>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            impr: false,
            drawer: null,
            agregar: "",
            cantidad: "1",
            separado: [],
            carrito: [],
            granTotal: 0.00,
            efectivo: "",
            cambio: "",
            rules: {
                numero: [val => {
                    const patternA = /^([0-9]{13})|([0-9]{1,5}[*]{1}[0-9]{13})$/
                    const patternB = /^([0-9]{1,5}[*]{1}[0-9]{13})$/
                    return (patternA.test(val) || patternB.test(val)) || 'Contiene caracteres invalidos'
                }]
            }
        };
    },
    computed: {},
    watch: {
        agregar: async function () {
            if (this.agregar == "") {
                await this.$refs['lector'].reset();
            } else {
                if (this.agregar.indexOf('*') != -1) {
                    this.separado = this.agregar.split('*');
                    if (this.separado[1].length == 13) {
                        this.cantidad = this.separado[0];
                        this.agregarCarrito(this.separado[1]);
                    }
                } else {
                    if (this.agregar.length == 13) {
                        this.agregarCarrito(this.agregar);
                    }
                }

            }
        },
        carrito: function () {
            this.granTotal = 0
            this.carrito.forEach(element => {
                this.granTotal += parseFloat(element.total)
            });
            this.caja
        },
        efectivo: function () {
            this.cambio = this.efectivo - this.granTotal
        }
    },
    created() {},
    methods: {
        quitar(ind) {
            this.carrito.splice(ind, 1);
        },
        agregarCarrito(id) {
            this.axios.get("/productos/" + id).then(res => {
                    this.carrito.push({
                        nombre: res.data.nombre,
                        cantidad: this.cantidad,
                        precioUnitario: res.data.precio,
                        total: res.data.precio * this.cantidad
                    });
                    this.agregar = ""
                    this.cantidad = "1"
                })
                .catch(err => alert('Articulo no registrado.'))
        },
        cancelar() {
            this.dialog = false;
        },
        imprimir() {
            if (this.efectivo < this.granTotal) {
                alert('Efectivo insuficiente')
            } else {
                var ticket = this.$refs['imprimir'];

                var ventimp = window.open(' ', 'popimpr');
                ventimp.document.write(ticket.innerHTML);
                ventimp.document.close();
                ventimp.print();
                ventimp.close();
            }
        }
    }
};
</script>