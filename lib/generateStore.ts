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
    await prismadb.billboard.createMany({ data: billboards })
    const featuredBillboard = await prismadb.billboard.findFirst({
        where: { label: "Explore The Featured Collection" },
    })
    const glassesBillboard = await prismadb.billboard.findFirst({
        where: { label: "Explore The Glasses Collection!" },
    })
    const shirtsBillboard = await prismadb.billboard.findFirst({
        where: { label: "Explore The Shirts Collection!" },
    })
    const suitesBillboard = await prismadb.billboard.findFirst({
        where: { label: "Explore The Suits Collection!" },
    })

    // Add categories
    const categories = [
        { storeId, billboardId: glassesBillboard!.id, name: "Glasses" },
        { storeId, billboardId: shirtsBillboard!.id, name: "Shirts" },
        { storeId, billboardId: suitesBillboard!.id, name: "Suits" },
    ]
    await prismadb.category.createMany({ data: categories })

    // Add sizes
    const sizes = [
        { storeId, name: "Extra Large", value: "xl" },
        { storeId, name: "Large", value: "lg" },
        { storeId, name: "Medium", value: "m" },
        { storeId, name: "Small", value: "s" },
        { storeId, name: "Extra Small", value: "xs" },
    ]
    await prismadb.size.createMany({ data: sizes })

    // Add colors
    const colors = [
        { storeId, name: "Green", value: "#18A558" },
        { storeId, name: "Red", value: "#C85250" },
        { storeId, name: "Black", value: "#000000" },
        { storeId, name: "White", value: "#ffffff" },
        { storeId, name: "Blue", value: "#0074B7" },
    ]
    prismadb.color.createMany({ data: colors })

    // Get category ids
    const suitsCategoryId = await prismadb.category.findFirst({ where: { name: "Suits" } })
    const glassesCategoryId = await prismadb.category.findFirst({ where: { name: "Glasses" } })
    const shirtsCategoryId = await prismadb.category.findFirst({ where: { name: "Shirts" } })

    // Get color ids
    const redColorId = await prismadb.color.findFirst({ where: { name: "Red" } })
    const blackColorId = await prismadb.color.findFirst({ where: { name: "Black" } })
    const blueColorId = await prismadb.color.findFirst({ where: { name: "Blue" } })
    const greenColorId = await prismadb.color.findFirst({ where: { name: "Green" } })
    const whiteColorId = await prismadb.color.findFirst({ where: { name: "White" } })

    // Get size ids
    const smallSizeId = await prismadb.size.findFirst({ where: { name: "Small" } })
    const largeSizeId = await prismadb.size.findFirst({ where: { name: "Large" } })
    const xSmallSizeId = await prismadb.size.findFirst({ where: { name: "Extra Small" } })
    const mediumSizeId = await prismadb.size.findFirst({ where: { name: "Medium" } })

    // Add products
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

    await prismadb.product.createMany({ data: products })

    const allproducts = await prismadb.product.findMany({
        where: {
            storeId,
        },
    })
    console.log("🚀 ~ file: generateStore.ts:243 ~ generateStore ~ allproducts:", allproducts)

    const images = [
        {
            productId: allproducts.filter((a) => a.name === "Green Suit")[0]?.id,
            url: "https://res.cloudinary.com/dnpnnjoif/image/upload/v1689267200/waxw8wu6usteupwepbep.webp",
        },
        {
            productId: allproducts.filter((a) => a.name === "Black Sunglasses")[0]?.id,
            url: "https://res.cloudinary.com/dnpnnjoif/image/upload/v1689267527/icdggsc8mow74m24a9yf.webp",
        },
        {
            productId: allproducts.filter((a) => a.name === "White Shirt")[0]?.id,
            url: "https://res.cloudinary.com/dnpnnjoif/image/upload/v1689267372/qeaqidrktvafjfkusomp.webp",
        },
        {
            productId: allproducts.filter((a) => a.name === "Green Suit")[0]?.id,
            url: "https://res.cloudinary.com/dnpnnjoif/image/upload/v1689267201/ux1laychkyil7glmfbhy.webp",
        },
        {
            productId: allproducts.filter((a) => a.name === "White Sunglasses")[0]?.id,
            url: "https://res.cloudinary.com/dnpnnjoif/image/upload/v1689267462/frpjnlniksfzlays6zd1.webp",
        },
        {
            productId: allproducts.filter((a) => a.name === "Navy Blue Suit")[0]?.id,
            url: "https://res.cloudinary.com/dnpnnjoif/image/upload/v1689267308/qn2btbz8solsuhiyk6qr.webp",
        },
        {
            productId: allproducts.filter((a) => a.name === "Navy Blue Suit")[0]?.id,
            url: "https://res.cloudinary.com/dnpnnjoif/image/upload/v1689267307/k9vnhljko3po6dt79kd0.webp",
        },
        {
            productId: allproducts.filter((a) => a.name === "Brown Sunglasses")[0]?.id,
            url: "https://res.cloudinary.com/dnpnnjoif/image/upload/v1689267494/yppdt3brj14mbzhp3r8s.webp",
        },
        {
            productId: allproducts.filter((a) => a.name === "White Shirt")[0]?.id,
            url: "https://res.cloudinary.com/dnpnnjoif/image/upload/v1689267369/ovnuhwwrxiydxjkq1meq.webp",
        },
        {
            productId: allproducts.filter((a) => a.name === "Maroon")[0]?.id,
            url: "https://res.cloudinary.com/dnpnnjoif/image/upload/v1689267265/q4gjvfecwspmmsf8qbi3.webp",
        },
        {
            productId: allproducts.filter((a) => a.name === "Black Suit")[0]?.id,
            url: "https://res.cloudinary.com/dnpnnjoif/image/upload/v1689262029/iftss9h15ni184nnb8qc.webp",
        },
    ]

    await prismadb.image.createMany({ data: images })

    return storeId
}
