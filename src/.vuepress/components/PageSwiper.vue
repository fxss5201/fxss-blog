<template>
  <swiper
    :modules="modules"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false
    }"
    navigation
    :pagination="{ clickable: true }"
    class="page-swiper box-sizing__border-box"
  >
    <swiper-slide v-for="item in props.list">
      <div class="p__10">
        <div class="img-name text-bold">{{item.name}}</div>
        <div class="display__flex align-items__center justify-content__center">
          <img :src="$withBase(item.img)" :alt="item.name">
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Autoplay, Navigation, Pagination } from 'swiper';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

  const props = defineProps({
    list: {
      type: Array,
      default() {
        return []
      }
    }
  })
  const modules = [Autoplay, Navigation, Pagination]
</script>

<style lang="scss">
  .page-swiper {
    --swiper-theme-color: var(--c-brand);
    border: 1px solid var(--c-border);
  }
  .img-name {
    color: var(--c-text);
    padding-bottom: 10px;
  }
</style>