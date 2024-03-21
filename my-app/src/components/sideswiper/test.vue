<template>
    <div>
        <h2>请选择菜品</h2>

        <div v-if="!isSetMealMode">
            <h3>菜单：</h3>
            <div v-for="item in menu" :key="item.id">
                <p>{{ item.name }} - ￥{{ item.price }}</p>
                <button @click="addToCart(item)">加入购物车</button>
            </div>
        </div>

        <div v-else>
            <h2>请选择套餐</h2>

            <h3>请选择荤菜：</h3>
            <select v-model="selectedMeat">
                <option value="">请选择</option>
                <option v-for="meat in meats" :key="meat.id" :value="meat.id">{{ meat.name }}</option>
            </select>

            <h3>请选择素菜：</h3>
            <select v-model="selectedVegetable">
                <option value="">请选择</option>
                <option v-for="vegetable in vegetables" :key="vegetable.id" :value="vegetable.id">{{ vegetable.name }}
                </option>
            </select>

            <button @click="confirmOrder" :disabled="!validSelection">下单</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isSetMealMode: true,
            selectedMeat: '',
            selectedVegetable: '',
            menu: [
                { id: 1, name: '红烧肉', price: 30 },
                { id: 2, name: '青菜', price: 10 }
            ],
            meats: [
                { id: 1, name: '红烧肉' },
                { id: 2, name: '鱼香肉丝' }
            ],
            vegetables: [
                { id: 1, name: '青菜' },
                { id: 2, name: '土豆丝' }
            ]
        };
    },
    computed: {
        validSelection() {
            return this.selectedMeat && this.selectedVegetable;
        }
    },
    methods: {
        addToCart(item) {
            // 将商品加入购物车的逻辑
            alert('已将' + item.name + '加入购物车');
        },
        confirmOrder() {
            if (this.validSelection) {
                // 提交订单逻辑
                alert('您选择的套餐已下单：' + this.selectedMeat + ' + ' + this.selectedVegetable);
            } else {
                alert('请选择至少一荤一素菜');
            }
        }
    }
};
</script>
