<template>
    <div>
        <div v-for="(tag, index) in selectedOptions" :key="index" class="tag">
            {{ tag.name }}
            <span @click="removeTag(index)" class="remove-tag">×</span>
        </div>
        <div>
            <input type="text" v-model="inputValue" @input="filterOptions" @keydown.enter.prevent="addTag"
                @focus="showOptions" :placeholder="placeholder" @blur="hideDropdown" />
            <div v-if="showDropdown" class="dropdown">
                <div v-for="(option, index) in filteredOptions" :key="index" v-on:click="selectOption(option)" class="option-width">
                    {{ option.name }}
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        label: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            required: true,
        },
        placeholder: {
            type: String,
            default: 'Pelase select',
        },
        value: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            selectedOptions: this.value,
            inputValue: '',
            showDropdown: false,
        };
    },
    computed: {
        filteredOptions() {
            return this.options.filter(
                option => option.name.toLowerCase().includes(this.inputValue.toLowerCase()) && !this.isSelected(option)
            );
        },
    },
    watch: {
        value(newValue) {
            this.selectedOptions = newValue;
        },
    },
    methods: {
        addTag(option) {
            const selectedOption = option;
            console.log(selectedOption);
            if (selectedOption && !this.isSelected(selectedOption)) {
                this.selectedOptions.push(selectedOption);
                this.$emit('input', this.selectedOptions);
                this.inputValue = '';
            }
        },
        removeTag(index) {
            this.selectedOptions.splice(index, 1);
            this.$emit('input', this.selectedOptions);
        },
        filterOptions() {
            this.showDropdown = true;
        },
        showOptions() {
            this.showDropdown = true;
        },
        hideDropdown() {
             setTimeout(() => {
                this.showDropdown = false;
            }, 800);
        },
        selectOption(option) {
            console.log(option);
            this.addTag(option);
            this.showDropdown = false;
        },
        isSelected(option) {
            return this.selectedOptions.some(tag => tag.name === option.name);
        },
    },
};
</script>
  
<style scoped>
.tag {
    display: inline-block;
    margin: 5px;
    padding: 8px;
    padding-top: 6px !important;
    padding-bottom: 6px !important;
    background-color: #573078;
    border-radius: 15px;
    color: white;
    font-size: 10px;
}
.remove-tag {
    cursor: pointer;
    margin-left: 12px;
    color: white;
    font-weight: bold;
}
.dropdown {
    position: absolute;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 93.5%;
    max-height: 150px;
    overflow-y: auto;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 2;
}
.dropdown div {
    padding: 5px;
    cursor: pointer;
    font-size: 14px;
}
.dropdown div:hover {
    background-color: #f2f2f2;
}
.option-width{
    width:100%;
    height: 100%;
}
</style>
