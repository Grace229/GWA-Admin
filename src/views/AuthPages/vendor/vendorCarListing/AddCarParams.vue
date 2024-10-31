<template>
    <div>
        <!-- {{ form }} -->
        <!-- {{ vendorInfo }} -->
        <!-- {{ form.vehicleParameterValues }} -->
        <!-- {{ carForEdit.vehicleDetails.vehicleParameters }}/////
        {{ customParameters }} -->
        <!-- {{ carForEdit.vehicleDetails.features }}////// -->
        <!-- {{ features.items }} -->
        <!-- {{ savedCar }} -->
        <!-- {{ form.vehicleParameterValues }} -->
        <!-- {{ carForEdit }} -->
        <!-- <div>
            {{ vehicle.pictures }}
            
          
           
        </div> -->
        <!-- {{ features.items }}
        {{ haveFeatures }} -->
        <!-- {{ $route.name }} -->
        <!-- {{ vendorName }} ss -->
        <!-- {{ vendorInfo }}rr -->
        <!-- {{ store.getters['authToken/vendorInfo'] }} -->
        <Preview v-if="preview" />
        <AddCar v-else />
    </div>
</template>

<script setup>
import Preview from './Preview/CarDetails.vue';
import AddCar from '/src/views/AuthPages/vendor/vendorCarListing/AddCar.vue';
import { provide, reactive, onBeforeMount, computed, ref, watch } from 'vue';
import { getAllCarBrands, getBrandModels, getAllFeatures } from '@/services/VendorServices.js';
import { getAllParameters } from '@/services/ParameterServices.js';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { stateMenu } from '@/components/reusable/StateList.js';
import { Log, Constants, Util } from '@/util';
import { getVehicleById } from '@/services/MarketPlace';

onBeforeMount(() => {
    getBrands();
    getFeatures();
    getParameters();
    fillVehicleForm();
});
const store = useStore();
const vendorInfo = computed(() => store.getters['authToken/vendorInfo']);
const vendorName = store.getters['authToken/vendorInfo']?.vendorName;
const route = useRoute();
const savedCar = store.getters['vendor/savedCar'];
const preview = ref(false);
const userId = computed(() => store.getters['authToken/userId']);
const uploadedFiles = ref([]);
const customParameters = ref([]);
const carForEdit = ref({});
const haveFeatures = reactive({
    getCarFeatures: false,
    getAllFeatures: false,
});
const form = reactive({
    condition: '',
    brand: '',
    model: '',
    year: 0,
    // bodyType: '',
    // fuelType: '',
    // engineType: '',
    // interior: '',
    transmissionType: '',
    // color: '',
    mileage: '',
    price: '',
    financingType: null,
    VIN: '',
    location: '',
    description: '',
    pictures: [],
    vehicleParameterValues: [],
    comment: '',
    // selectedFeatures: computed(() => features.items),
});
const vehicle = reactive({
    brandId: computed(() => form.brand),
    vehicleModelId: computed(() => form.model),
    year: computed(() => Number(form.year)),
    condition: computed(() => form.condition),
    mileage: computed(() => form.mileage),
    location: computed(() => form.location),
    vin: computed(() => form.VIN),
    description: computed(() => form.description),
    pictures: computed(() => form.pictures),
    price: computed(() => form.price),
    userId: userId.value,
    features: computed(() => features.items.filter((feature) => feature.checked === true).map((feature) => feature.id)),
    // isDraft: true,
    transmissionType: computed(() => Number(form.transmissionType)),
    financeOption: computed(() => Number(form.financingType)),
    vehicleParameterValues: computed(() => form.vehicleParameterValues),
    vendorName: vendorName,
});

const editVehicleDetails = reactive({
    vendorName: vendorName,
    brandId: computed(() => form.brand),
    vehicleModelId: computed(() => form.model),
    year: computed(() => Number(form.year)),
    condition: computed(() => form.condition),
    mileage: computed(() => form.mileage),
    location: computed(() => form.location),
    vin: computed(() => form.VIN),
    description: computed(() => form.description),
    price: computed(() => form.price),
    pictures: computed(() => form.pictures),
    features: computed(() => features.items.filter((feature) => feature.checked === true).map((feature) => feature.id)),
    transmissionType: computed(() => Number(form.transmissionType)),
    vehicleParameterValues: computed(() => form.vehicleParameterValues),
});

const conditions = [
    {
        id: 1,
        text1: 'Brand New',
    },
    {
        id: 2,
        text1: 'Locally Used',
    },
    {
        id: 2,
        text1: 'Foreign Used',
    },
];

const brands = ref([]);

const models = ref([]);

const years = Util.getYearsList();
const bodyTypes = [
    {
        id: 1,
        text1: 'Metallic',
    },
    {
        id: 2,
        text1: 'Chrome',
    },
];
const fuelTypes = [
    {
        id: 1,
        text1: 'Petrol',
    },
    {
        id: 2,
        text1: 'Diesel',
    },
];
const engineTypes = [
    {
        id: 1,
        text1: '3.5L V6 Engine',
    },
    {
        id: 2,
        text1: '3.5L V8 Engine',
    },
];
const interiors = [
    {
        id: 1,
        text1: 'Fabric',
    },
    {
        id: 2,
        text1: 'Leather',
    },
];
const transmissionTypes = Constants.transmissionTypes;
const colors = [
    {
        id: 1,
        text1: 'Grey',
    },
    {
        id: 2,
        text1: 'Black',
    },
];
const mileages = [
    {
        id: 1,
        text1: '145,970',
    },
    {
        id: 2,
        text1: '195,260',
    },
];

const financingTypes = Constants.financeOptionsEnum;

// const stateMenu = [
//     {
//         id: 1,
//         text1: 'Lagos',
//     },
//     {
//         id: 2,
//         text1: 'Abuja',
//     },
// ];

const features = reactive({
    items: [],
});

const getBrands = () => {
    getAllCarBrands(
        userId.value,
        1,
        150,
        (res) => {
            brands.value = res.data.data.map((obj) => {
                obj.text1 = obj.name;
                return obj;
            });
        },
        (err) => {}
    );
};

const getModels = () => {
    getBrandModels(
        form.brand,
        (res) => {
            models.value = res.data.data.map((obj) => {
                obj.text1 = obj.name;
                return obj;
            });

            if (route?.meta?.action === 'Edit Car') {
                // const model = models.value.find(model => model.name == carForEdit.value?.model)
                form.model = Util.getIdFromName(carForEdit.value?.model, models.value);
            }
        },
        (err) => {}
    );
};

const setFeaturesToEdit = () => {
    // alert(JSON.stringify(carForEdit.value?.vehicleDetails?.features));
    if (carForEdit.value?.vehicleDetails?.features.length > 0 && features.items.length > 0) {
        // alert(JSON.stringify(haveFeatures));
        const carFeatures = carForEdit.value?.vehicleDetails?.features;
        const feats = features.items;

        const updatedFeatures = feats.map((feat) => {
            let obj = carFeatures.find((carFeat) => feat.id === carFeat.id);

            if (obj) {
                return { ...feat, checked: true };
            }
            return feat;
        });

        features.items = updatedFeatures;
    }
};

const getFeatures = () => {
    getAllFeatures(
        (res) => {
            features.items = res.data.data.map((obj) => {
                obj.checked = false;
                return obj;
            });

            if (route?.meta?.action === 'Edit Car') {
                // setFeaturesToEdit();

                haveFeatures.getAllFeatures = true;
            }
        },
        (err) => {}
    );
};

const getParameters = () => {
    getAllParameters(
        (res) => {
            customParameters.value = res.data.data;
        },
        (err) => {}
    );
};

const saveCar = () => {
    store.commit('vendor/savedCar', form);
    Util.handleGlobalAlert(true, 'success', 'Car Saved');
};

const setFormsForEdit = (car) => {
    editVehicleDetails.vehicleId = car.id;
    form.brand = Util.getIdFromName(car.brand, brands.value);
    form.comment = car.comment;
    form.year = car.year;
    form.pictures = car.pictures;
    form.condition = car.condition;
    form.mileage = car.mileage;
    form.description = car.description;
    form.location = car.location;
    form.transmissionType = String(car.transmissionType);
    form.price = car.price;
    form.VIN = car.vin;
    form.financingType = String(car.financeOption);
    //setting the inputs that dont update with their v-models
    uploadedFiles.value = car.pictures;
    document.getElementById('carPrice').value = car.price;
    document.getElementById('carMileage').value = car.mileage;

    form.vehicleParameterValues = car.vehicleDetails.vehicleParameters.map((obj) => {
        obj.parameterId = obj.id;

        return obj;
    });

    // setFeaturesToEdit();
};

const getVehicle = () => {
    // loading.value = true;
    getVehicleById(
        route.params.id,
        (res) => {
            carForEdit.value = res.data.data;
            setFormsForEdit(carForEdit.value);
            haveFeatures.getCarFeatures = true;
        },
        (err) => {
            // loading.value = false;
        }
    );
};

const fillVehicleForm = () => {
    if (route?.meta?.action === 'Edit Car') {
        getVehicle();
    }
};

const togglePreview = () => {
    preview.value = !preview.value;
};

watch(
    () => haveFeatures,
    () => {
        // alert('Features');
        if (haveFeatures.getAllFeatures === true && haveFeatures.getCarFeatures === true) {
            setFeaturesToEdit();
            // alert(JSON.stringify(haveFeatures));
        }
    },
    { deep: true }
);

provide('conditions', conditions);
provide('brands', brands);
provide('models', models);
provide('years', years);
provide('bodyTypes', bodyTypes);
provide('fuelTypes', fuelTypes);
provide('engineTypes', engineTypes);
provide('interiors', interiors);
provide('transmissionTypes', transmissionTypes);
provide('colors', colors);
provide('mileages', mileages);
provide('financingTypes', financingTypes);
provide('locations', stateMenu);
provide('features', features);
provide('vehicle', vehicle);
provide('getModels', getModels);
provide('form', form);
provide('preview', preview);
provide('saveCar', saveCar);
provide('togglePreview', togglePreview);
provide('uploadedFiles', uploadedFiles);
provide('getBrands', getBrands);
provide('customParameters', customParameters);
provide('getParameters', getParameters);
provide('editVehicleDetails', editVehicleDetails);
// provide('submitAVehicle', submitAVehicle);
// provide('savedVehicleId', savedVehicleId);
</script>

<style lang="scss" scoped></style>
