<template>
    <div class="containlike" v-if="usedata().likes == ''">
        <img src="../../assets/images/like.jpeg" alt="">
        <div class="miaoshu">
            <van-text-ellipsis content="text" />
            <b>￥ 68</b>
        </div>
    </div>

    <div v-else class="contains">
        <div class="containlike" v-for="(item, index) in usedata().likes.data" :key="index" @click="shop().getshopId(item.id)">
            <img :src=item.imgUrl alt="png">
            <div class="miaoshu">
                <van-text-ellipsis :content=item.name style="font-weight:bolder;margin-bottom: 5px;" />
                <div class="shopdata">
                     <div class="sore"><span>4.9</span>分</div>
                     <div class="buynum">月售2000</div>
                </div>
                <div class="eatstyle">
                    <span>可堂食</span>
                    <span>可打包</span>
                    <span>支持预定</span>
                    <span>限时开单</span>
                </div>
                <div class="shopact">
                    <span>到店送饮料</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { usedata } from '../../pinia/data';
import { shop } from '../../pinia/shop';
</script>
<style lang="less" scoped>
.contains {
   background-color: aliceblue;
   padding-bottom: 60px;
}

.containlike {
    background-color: #fff;
    display: flex;
    margin: 5px ;
    padding: 5px 10px;
    font-size: 15px;
    border-radius: 5px;
    .miaoshu{
        width: 100%;
        .shopdata{
            color: #666;
            display: flex;
            font-size: 12px;
            .sore{               
                line-height: 15px;
                 margin-right: 10px;
                color: rgb(239, 86, 10);
                  span{    
                font-weight: 700;
                font-size: 15px;    
            }
            }
            
        }
        .eatstyle{
            color: #1f1f1f;
            margin: 5px 0;
            font-size: 12px;
            span{
                background-color: #97d4bf;
                padding: 2px;
                border-radius: 2px;
                margin-right: 3px;
            }
        }
        .shopact{
            font-size: 12px;
             margin-top: 10px;
            span{
                padding: 2px;
                border-radius: 2px;
                background-color: #e8c9af;
                margin-right: 3px;
               
            }
        }
    }
    img {
        padding: 0 10px;
        width: 100px;
        border-radius: 10%;
    }

}
</style>