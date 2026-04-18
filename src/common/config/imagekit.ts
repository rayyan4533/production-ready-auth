import ImageKit from '@imagekit/nodejs';
import { exp } from '@tensorflow/tfjs';

const imgClient = new ImageKit({

    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
    // urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT!
}) as any;


export default imgClient;