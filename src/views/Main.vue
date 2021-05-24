<template>
    <div id="first-page">
        <search-trip></search-trip>
    </div>
</template>
<script>
import SearchTrip from "@/components/SearchTrip.vue";

export default {
    name: "Main",
    data() {
        return {};
    },
    components: { SearchTrip },
};
</script>
<style scoped>
</style>