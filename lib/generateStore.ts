import prismadb from "@/lib/prismadb"

export async function generateStore(userId: string) {
    const storeData = { name: "Clothing", userId }

    const { id: storeId } = await prismadb.store.create({
        data: storeData,
    })
    console.log("🚀 ~ file: layout.tsx:32 ~ SetupLayout ~ store2:", storeId)

    const billboards = [
        {
            storeId,
            label: "Explore The Suits Collection!",
            imageUrl: "https://res.cloudinary.com/dnpnnjoif/image/upload/v1689260379/gqn6yylqzwz1k0c8bwel.png",
        },
        {
            storeId,
            label: "Explore The Featured Collection!",
            imageUrl: "https://res.cloudinary.com/dnpnnjoif/image/upload/v1689261011/ujscuccdbx8ytx2blzpv.png",
        },
        {
            storeId,
            label: "Explore The Glasses Collection!",
            imageUrl: "https://res.cloudinary.com/dnpnnjoif/image/upload/v1689267047/rwpv6sfniunbl6nnwrom.png",
        },
        {
            storeId,
            label: "Explore The Shirts Collection!",
            imageUrl: "https://res.cloudinary.com/dnpnnjoif/image/upload/v1689267025/wijepomdb0syxyq3ks7z.png",
        },
    ]

    // Add billboards
    const billresponse = await prismadb.billboard.createMany({
        data: billboards,
    })
    console.log("🚀 ~ file: layout.tsx:56 ~ SetupLayout ~ billresponse:", billresponse)

    const featuredBillboard = await prismadb.billboard.findFirst({
        where: { label: "Explore The Featured Collection" },
    })
    console.log("🚀 ~ file: layout.tsx:25 ~ SetupLayout ~ featuredBillboard:", featuredBillboard?.id)

    const glassesBillboard = await prismadb.billboard.findFirst({
        where: { label: "Explore The Glasses Collection!" },
    })
    console.log("🚀 ~ file: layout.tsx:25 ~ SetupLayout ~ glassesBillboard:", glassesBillboard?.id)

    const shirtsBillboard = await prismadb.billboard.findFirst({
        where: { label: "Explore The Shirts Collection!" },
    })
    console.log("🚀 ~ file: layout.tsx:25 ~ SetupLayout ~ shirtsBillboard:", shirtsBillboard?.id)

    const suitesBillboard = await prismadb.billboard.findFirst({
        where: { label: "Explore The Suits Collection!" },
    })
    console.log("🚀 ~ file: layout.tsx:25 ~ SetupLayout ~ suitesBillboard:", suitesBillboard?.id)

    const categories = [
        {
            storeId,
            billboardId: glassesBillboard!.id,
            name: "Glasses",
        },
        {
            storeId,
            billboardId: shirtsBillboard!.id,
            name: "Shirts",
        },
        {
            storeId,
            billboardId: suitesBillboard!.id,
            name: "Suits",
        },
    ]

    const categoryResponse = await prismadb.category.createMany({
        data: categories,
    })
    console.log("🚀 ~ file: layout.tsx:99 ~ SetupLayout ~ categoryResponse:", categoryResponse)

    const sizes = [
        {
            storeId,
            name: "Extra Large",
            value: "xl",
        },
        {
            storeId,
            name: "Large",
            value: "lg",
        },
        {
            storeId,
            name: "Medium",
            value: "m",
        },
        {
            storeId,
            name: "Small",
            value: "s",
        },
        {
            storeId,
            name: "Extra Small",
            value: "xs",
        },
    ]

    const sizesResponse = await prismadb.size.createMany({
        data: sizes,
    })
    console.log("🚀 ~ file: layout.tsx:99 ~ SetupLayout ~ categoryResponse:", sizesResponse)

    const colors = [
        {
            storeId,
            name: "Green",
            value: "#18A558",
        },
        {
            storeId,
            name: "Red",
            value: "#C85250",
        },
        {
            storeId,
            name: "Black",
            value: "#000000",
        },
        {
            storeId,
            name: "White",
            value: "#ffffff",
        },
        {
            storeId,
            name: "Blue",
            value: "#0074B7",
        },
    ]

    const colorsResponse = await prismadb.color.createMany({
        data: colors,
    })
    console.log("🚀 ~ file: layout.tsx:99 ~ SetupLayout ~ categoryResponse:", colorsResponse)

    // Products
    const suitsCategoryId = await prismadb.category.findFirst({ where: { name: "Suits" } })
    const glassesCategoryId = await prismadb.category.findFirst({ where: { name: "Glasses" } })
    const shirtsCategoryId = await prismadb.category.findFirst({ where: { name: "Shirts" } })

    const redColorId = await prismadb.color.findFirst({ where: { name: "Red" } })
    const blackColorId = await prismadb.color.findFirst({ where: { name: "Black" } })
    const blueColorId = await prismadb.color.findFirst({ where: { name: "Blue" } })
    const greenColorId = await prismadb.color.findFirst({ where: { name: "Green" } })
    const whiteColorId = await prismadb.color.findFirst({ where: { name: "White" } })

    const smallSizeId = await prismadb.size.findFirst({ where: { name: "Small" } })
    const largeSizeId = await prismadb.size.findFirst({ where: { name: "Large" } })
    const xSmallSizeId = await prismadb.size.findFirst({ where: { name: "Extra Small" } })
    const mediumSizeId = await prismadb.size.findFirst({ where: { name: "Medium" } })

    const products = [
        {
            storeId,
            categoryId: suitsCategoryId!.id,
            name: "Maroon",
            price: 130,
            isFeatured: true,
            isArchived: false,
            sizeId: smallSizeId!.id,
            colorId: redColorId!.id,
        },
        {
            storeId,
            categoryId: glassesCategoryId!.id,
            name: "Black Sunglasses",
            price: 200,
            isFeatured: true,
            isArchived: false,
            sizeId: smallSizeId!.id,
            colorId: blackColorId!.id,
        },
        {
            storeId,
            categoryId: suitsCategoryId!.id,
            name: "Navy Blue Suit",
            price: 100,
            isFeatured: true,
            isArchived: false,
            sizeId: largeSizeId!.id,
            colorId: blueColorId!.id,
        },
        {
            storeId,
            categoryId: suitsCategoryId!.id,
            name: "Green Suit",
            price: 60,
            isFeatured: true,
            isArchived: false,
            sizeId: xSmallSizeId!.id,
            colorId: greenColorId!.id,
        },
        {
            storeId,
            categoryId: suitsCategoryId!.id,
            name: "Black Suit",
            price: 200,
            isFeatured: true,
            isArchived: false,
            sizeId: largeSizeId!.id,
            colorId: blackColorId!.id,
        },
        {
            storeId,
            categoryId: glassesCategoryId!.id,
            name: "White Sunglasses",
            price: 60,
            isFeatured: true,
            isArchived: false,
            sizeId: smallSizeId!.id,
            colorId: whiteColorId!.id,
        },
        {
            storeId,
            categoryId: glassesCategoryId!.id,
            name: "Brown Sunglasses",
            price: 130,
            isFeatured: true,
            isArchived: false,
            sizeId: smallSizeId!.id,
            colorId: blackColorId!.id,
        },
        {
            storeId,
            categoryId: shirtsCategoryId!.id,
            name: "White Shirt",
            price: 30,
            isFeatured: true,
            isArchived: false,
            sizeId: mediumSizeId!.id,
            colorId: whiteColorId!.id,
        },
    ]

    const productsResponse = await prismadb.product.createMany({ data: products })
    console.log("🚀 ~ file: generateStore.ts:249 ~ generateStore ~ productsResponse:", productsResponse)

    return storeId
}
