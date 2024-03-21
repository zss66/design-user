<template>
    <van-address-edit :area-list="areaList" show-delete show-set-default show-search-result :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']" :address-info="path().editor" @save="onSave" @delete="onDelete"
        @change-detail="onChangeDetail" />
</template>
<script setup >
import { ref } from 'vue';
import { areaList } from '@vant/area-data';
import { showToast } from 'vant';
import { path } from '../../pinia/path';
import http from '../../utils/request';
import router from '../../router';
const searchResult = ref([]);
const onSave = (info) => {
    showToast('save');
    console.log(info.id);
    http.post('api/updatepath', {
        add: path().add,
        id: info.id,
        name: info.name,
        tel: info.tel,
        province: info.province,
        city: info.city,
        county: info.county,
        addressDetail: info.addressDetail,
        isDefault: info.isDefault,
        areaCode: info.areaCode,
    }).then(showToast('修改完成'))
    router.go(-1);
}
const onDelete = () => {
    http.post('api/deletepath', {
        id: path().editor.id,
    })
    if (path().editor.isDefault == 1) {
    }
    router.go(-1);

};
const onChangeDetail = (val) => {
    if (val) {


    } else {
        searchResult.value = [];
    }
};
</script>
<style scoped lang="less"></style>