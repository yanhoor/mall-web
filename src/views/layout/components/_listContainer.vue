<template>
    <div class="list_container">
        <div class="filter_form">
            <slot name="filterForm"></slot>
        </div>
        <div class="filter_actions">
            <slot name="filterActions"></slot>
        </div>
        <div class="list_content">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent, reactive, ref } from 'vue'

    export default defineComponent({
        name: 'layout-list-container',
        components: {

        },
    })
</script>

<style lang="less" scoped>

    .filter_actions{
        margin: 10px 0;
    }

</style>
