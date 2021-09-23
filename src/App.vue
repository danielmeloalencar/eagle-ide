<template>
<mainScreen />
</template>

<script>
import mainScreen from "./components/mainScreen";

export default {
    name: "App",
    components: {
        mainScreen,
    },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");

body {
    background-color: #21222c;
    font-family: "Roboto";
}

html {
    overflow: hidden;
}

/* width */
::-webkit-scrollbar {
    width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #21222c;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #bd93f994;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #bd93f9;
}
</style>
