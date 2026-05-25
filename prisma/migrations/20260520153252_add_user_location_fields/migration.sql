-- CreateTable
CREATE TABLE "Client" (
    "idClient" SERIAL NOT NULL,
    "nameClient" TEXT NOT NULL,
    "ciClient" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("idClient")
);

-- CreateTable
CREATE TABLE "User" (
    "idUser" SERIAL NOT NULL,
    "fullNameUser" TEXT NOT NULL,
    "nitUser" TEXT NOT NULL,
    "numberPhoneUser" TEXT NOT NULL,
    "codeUser" TEXT NOT NULL,
    "emailUser" TEXT NOT NULL,
    "passwordUser" TEXT NOT NULL,
    "numberSucursal" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "numberLocality" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "Detail" (
    "idDetail" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idClient" INTEGER NOT NULL,
    "dateDetail" TIMESTAMP(3) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cufCode" TEXT NOT NULL,

    CONSTRAINT "Detail_pkey" PRIMARY KEY ("idDetail")
);

-- CreateTable
CREATE TABLE "ListDetail" (
    "idListDetail" SERIAL NOT NULL,
    "idDetail" INTEGER NOT NULL,
    "codeService" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "unitMeasurement" TEXT NOT NULL,
    "descriptionDetail" TEXT NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "subTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "ListDetail_pkey" PRIMARY KEY ("idListDetail")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_ciClient_key" ON "Client"("ciClient");

-- CreateIndex
CREATE UNIQUE INDEX "User_nitUser_key" ON "User"("nitUser");

-- CreateIndex
CREATE UNIQUE INDEX "User_numberPhoneUser_key" ON "User"("numberPhoneUser");

-- CreateIndex
CREATE UNIQUE INDEX "User_codeUser_key" ON "User"("codeUser");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailUser_key" ON "User"("emailUser");

-- CreateIndex
CREATE UNIQUE INDEX "Detail_cufCode_key" ON "Detail"("cufCode");

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client"("idClient") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListDetail" ADD CONSTRAINT "ListDetail_idDetail_fkey" FOREIGN KEY ("idDetail") REFERENCES "Detail"("idDetail") ON DELETE RESTRICT ON UPDATE CASCADE;
