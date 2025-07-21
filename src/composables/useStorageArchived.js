// import getUser from "@/composables/getUser"
// import { projectStorage } from "@/firebase/config"
// import { getDownloadURL, ref as storageRefFunc, uploadBytes } from "firebase/storage"
// import { ref } from "vue"

// const { user } = getUser() // Importing user data from the composable

// const useStorage = () => {
//     const error = ref(null)
//     const url = ref(null)
//     const filePath = ref(null)

//     const uploadImage = async (file, path) => {
//         filePath.value = `covers/${user.value.uid}/${file.name}`
//         const storageRef = storageRefFunc(projectStorage, filePath.value)
//         try {
//             const res = await uploadBytes(storageRef, file)
//             url.value = await getDownloadURL(res.ref)

//         }catch (err) {
//             error.value = err.message
//             console.error("Upload failed:", error.value)
//         }
//     }
//     return { error, url, filePath, uploadImage }
// }
// export default useStorage