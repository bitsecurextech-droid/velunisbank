-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountTypeRequested" "AccountType",
ADD COLUMN     "addressLine1" TEXT,
ADD COLUMN     "addressLine2" TEXT,
ADD COLUMN     "annualIncome" DOUBLE PRECISION,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "employmentStatus" TEXT,
ADD COLUMN     "middleName" TEXT,
ADD COLUMN     "mobileNumber" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "sourceOfFunds" TEXT,
ADD COLUMN     "state" TEXT;
