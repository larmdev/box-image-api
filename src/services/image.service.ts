import { readClient, writeClient } from '../prisma/client.js'
import createError from '../configs/error-method.js';
import { bucket } from '../configs/firebase.js'

export module Image {


    export function getImage(
        userId: string,
        imageId: string,
        size: any,
        page: any

    ) {
        return new Promise(async (resolve, reject) => {
            try {

                const limit: number = +(size)
                const offset: number = +(limit * ((page || 1) - 1))

                const where: { [key: string]: any } = {
                    userId: userId
                }

                if (imageId) {
                    where.imageId = imageId;
                }

                Promise.all([
                    readClient.image.findMany({
                        skip: offset,
                        take: limit,
                        where: where,
                        orderBy: { createdAt: 'desc' }
                    }),
                    readClient.image.count({ where: where })
                ]).then((result: any) => {

                    const rows: Array<{ [key: string]: any }> = result[0]
                    const count: number = result[1];

                    resolve({
                        total: count,
                        lastPage: Math.ceil(count / limit),
                        currPage: +page || 1,
                        limit: limit,
                        rowsCount: rows.length,
                        rows: rows
                    })

                })

            } catch (error: any) {
                reject(createError.ErrorNotFound(error))
            }
        })
    }

    export function uploadImage(userId: string, file: any) {
        return new Promise(async (resolve, reject) => {
            try {
                const imageUrl: any = await toFilebaseStorage(file);
                const dataPayload: any = toDataPayload(userId, imageUrl);
                const created = await writeClient.image.create({ data: dataPayload });
                resolve(created)
            } catch (error: any) {
                reject(createError.ErrorNotFound(error))
            }
        })
    }

    export function toFilebaseStorage(
        imagefile: any,
    ) {
        return new Promise(async (resolve, reject) => {
            try {

                const initIamgeName = Date.now() + "." + imagefile.originalname.split(".").pop();
                const file = bucket.file(initIamgeName);

                const stream: any = file.createWriteStream({
                    metadata: { contentType: 'image/png' || 'image/jpg' }
                })

                stream.on('error', (error: any) => {
                    reject(createError.ErrorNotFound(error))
                })

                stream.on('finish', async () => {
                    const result: any = await file.makePublic()
                    const imageUrl: string = `${process.env.PUBLIC_STORAGE_URL}/${result[0].bucket}/${initIamgeName}`
                    resolve(imageUrl);
                })
                stream.end(imagefile.buffer)

            } catch (error: any) {
                reject(createError.ErrorNotFound(error))
            }
        })
    }

    export function toDataPayload(userId: string, imageUrl: string) {
        const obj: { [key: string]: any } = {}

        obj.userId = userId;
        obj.imageUrl = imageUrl;
        return obj;
    }


};
