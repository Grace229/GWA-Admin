<template>
    <div>
        <!-- {{ carForEdit.id }} -->
        <!-- {{ editVehicleDetails.brandId }} -->
        <!-- {{ vehicle.price }} -->
        <Preview v-if="preview" />
        <EditProduct v-else />
    </div>
</template>

<script setup>
import EditProduct from '@/views/admin/adminViews/adminProducts/editProduct/EditProduct.vue';
import Preview from './Preview/CarDetails.vue';
import { provide, reactive, onBeforeMount, computed, ref, watch } from 'vue';
import { getAllCarBrands, getBrandModels, getAllFeatures } from '@/services/VendorServices.js';
import { getAllParameters } from '@/services/ParameterServices.js';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { stateMenu } from '@/components/reusable/StateList.js';
import { Log, Constants, Util } from '@/util';
// import { getVehicleById } from '@/services/MarketPlace';
import { getProduct } from '@/services/AdminServices';

onBeforeMount(() => {
    getBrands();
    getFeatures();
    getParameters();
    fillVehicleForm();
});
const store = useStore();
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
});

const editVehicleDetails = reactive({
    // vehicleId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    // vendorName: 'string',
    // brandId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',/
    // vehicleModelId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',/
    // year: 0,/
    // condition: 'string',/
    // mileage: 0,/
    // location: 'string',/
    // vin: 'string',/
    // description: 'string',/
    // pictures: [
    //     {
    //         photoname: 'string',
    //         fileName: 'string',
    //         fileUrl: 'string',
    //         isDefault: true,
    //     },
    // ],/
    // price: 0,/
    // features: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],/
    // transmissionType: 0,/
    // vehicleParameterValues: [
    //     {
    //         parameterId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    //         value: 'string',
    //     },
    // ],/
    vehicleId: carForEdit.value.id,
    vendorName: carForEdit.value.vendorName,
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
// const years = [
//     {
//         id: 1,
//         text1: '2008',
//     },
//     {
//         id: 2,
//         text1: '2009',
//     },
// ];
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
    // features.items.map((item) => {
    //     if (carForEdit.value.vehicleDetails.features.some((otherItem) => otherItem.id === item.id)) {
    //         item.checked = true;
    //     } else {
    //         item.checked = false;
    //     }
    // });

    // arr1.map((item) => {
    //     if (arr2.some((otherItem) => otherItem.id === item.id)) {
    //         item.checked = true;
    //     } else {
    //         item.checked = false;
    //     }
    // });

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
    form.brand = Util.getIdFromName(car?.brand, brands.value);

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
    getProduct(
        route.params.vehicleId,
        (res) => {
            // loading.value = false;

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
    getVehicle();
};

const togglePreview = () => {
    preview.value = !preview.value;
};

watch(
    () => haveFeatures,
    () => {
        // alert('Features');
        if (haveFeatures.getAllFeatures && haveFeatures.getCarFeatures) {
            setFeaturesToEdit();
            // alert('Hello');
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
provide('carForEdit', carForEdit);
</script>

<style lang="scss" scoped></style>

<style lang="scss" scoped></style>
