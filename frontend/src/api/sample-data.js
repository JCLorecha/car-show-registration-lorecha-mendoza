const SAMPLE_REGISTRATIONS = [
  { id: "1001", registrationNumber: "CS27-0001", registrationDate: "2027-02-10T08:30:00Z", participantName: "Juan Dela Cruz", contactNumber: "09171234567", email: "juan@example.com", address: "123 Rizal St., Sorsogon City", carMakeModel: "Toyota Supra MK4", plateNumber: "ABC 1234", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500.00, amountPaid: 2500.00, paymentStatus: "Paid" },
  { id: "1002", registrationNumber: "CS27-0002", registrationDate: "2027-02-10T09:15:00Z", participantName: "Maria Santos", contactNumber: "09182345678", email: "maria.s@example.com", address: "45 Magsaysay Ave., Legazpi City", carMakeModel: "Honda Civic Type R", plateNumber: "DEF 5678", registrationType: "Exhibitor", status: "CheckedIn", registrationFee: 3500.00, amountPaid: 3500.00, paymentStatus: "Paid" },
  { id: "1003", registrationNumber: "CS27-0003", registrationDate: "2027-02-10T10:00:00Z", participantName: "Carlo Mendoza", contactNumber: "09193456789", email: "carlo.m@example.com", address: "78 Quezon St., Naga City", carMakeModel: "Nissan GT-R R35", plateNumber: "GHI 9012", registrationType: "VIP", status: "Confirmed", registrationFee: 5000.00, amountPaid: 2500.00, paymentStatus: "Partial" },
  { id: "1004", registrationNumber: "CS27-0004", registrationDate: "2027-02-10T10:45:00Z", participantName: "Angela Reyes", contactNumber: "09204567890", email: "angela.r@example.com", address: "12 Bonifacio St., Sorsogon City", carMakeModel: "Mazda MX-5 Miata", plateNumber: "JKL 3456", registrationType: "Competitor", status: "Pending", registrationFee: 2500.00, amountPaid: 0.00, paymentStatus: "Unpaid" },
  { id: "1005", registrationNumber: "CS27-0005", registrationDate: "2027-02-10T11:20:00Z", participantName: "Rafael Torres", contactNumber: "09215678901", email: "rafael.t@example.com", address: "90 Burgos St., Daraga, Albay", carMakeModel: "Subaru WRX STI", plateNumber: "MNO 7890", registrationType: "Exhibitor", status: "CheckedIn", registrationFee: 3500.00, amountPaid: 3500.00, paymentStatus: "Paid" },
  { id: "1006", registrationNumber: "CS27-0006", registrationDate: "2027-02-10T13:05:00Z", participantName: "Patricia Lim", contactNumber: "09226789012", email: "patricia.lim@example.com", address: "56 Peñafrancia Ave., Naga City", carMakeModel: "Porsche 911 Carrera", plateNumber: "PQR 1122", registrationType: "VIP", status: "Confirmed", registrationFee: 5000.00, amountPaid: 5000.00, paymentStatus: "Paid" },
  { id: "1007", registrationNumber: "CS27-0007", registrationDate: "2027-02-10T13:50:00Z", participantName: "Paolo Villanueva", contactNumber: "09237890123", email: "paolo.v@example.com", address: "34 Luna St., Sorsogon City", carMakeModel: "Mitsubishi Lancer Evo IX", plateNumber: "STU 3344", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500.00, amountPaid: 1500.00, paymentStatus: "Partial" },
  { id: "1008", registrationNumber: "CS27-0008", registrationDate: "2027-02-10T14:30:00Z", participantName: "Camille Bautista", contactNumber: "09248901234", email: "camille.b@example.com", address: "210 Del Rosario St., Iriga City", carMakeModel: "BMW M3 Competition", plateNumber: "VWX 5566", registrationType: "VIP", status: "CheckedIn", registrationFee: 5000.00, amountPaid: 5000.00, paymentStatus: "Paid" },
  { id: "1009", registrationNumber: "CS27-0009", registrationDate: "2027-02-10T15:10:00Z", participantName: "Jerome Navarro", contactNumber: "09259012345", email: "jerome.n@example.com", address: "88 Mabini St., Sorsogon City", carMakeModel: "Ford Mustang GT", plateNumber: "YZA 7788", registrationType: "Exhibitor", status: "Cancelled", registrationFee: 3500.00, amountPaid: 0.00, paymentStatus: "Unpaid" },
  { id: "1010", registrationNumber: "CS27-0010", registrationDate: "2027-02-10T16:00:00Z", participantName: "Sofia Ramos", contactNumber: "09260123456", email: "sofia.r@example.com", address: "14 Osmeña St., Legazpi City", carMakeModel: "Audi RS3", plateNumber: "BCD 9900", registrationType: "Competitor", status: "Pending", registrationFee: 2500.00, amountPaid: 1000.00, paymentStatus: "Partial" },
  { id: "1011", registrationNumber: "CS27-0011", registrationDate: "2027-02-11T08:15:00Z", participantName: "Kenneth Castillo", contactNumber: "09271122334", email: "kenneth.c@example.com", address: "67 Zamora St., Sorsogon City", carMakeModel: "Toyota GR86", plateNumber: "EFG 2468", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500.00, amountPaid: 2500.00, paymentStatus: "Paid" },
  { id: "1012", registrationNumber: "CS27-0012", registrationDate: "2027-02-11T09:00:00Z", participantName: "Bianca Aquino", contactNumber: "09282233445", email: "bianca.a@example.com", address: "102 Real St., Sorsogon City", carMakeModel: "Hyundai Veloster N", plateNumber: "HIJ 1357", registrationType: "Exhibitor", status: "Confirmed", registrationFee: 3500.00, amountPaid: 1750.00, paymentStatus: "Partial" },
  { id: "1013", registrationNumber: "CS27-0013", registrationDate: "2027-02-11T09:45:00Z", participantName: "Daniel Flores", contactNumber: "09293344556", email: "daniel.f@example.com", address: "19 Taft Ave., Naga City", carMakeModel: "Lexus RC F", plateNumber: "KLM 8642", registrationType: "VIP", status: "CheckedIn", registrationFee: 5000.00, amountPaid: 5000.00, paymentStatus: "Paid" },
  { id: "1014", registrationNumber: "CS27-0014", registrationDate: "2027-02-11T10:30:00Z", participantName: "Tricia Gomez", contactNumber: "09304455667", email: "tricia.g@example.com", address: "53 San Pedro St., Sorsogon City", carMakeModel: "Honda S2000", plateNumber: "NOP 9753", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500.00, amountPaid: 2500.00, paymentStatus: "Paid" },
  { id: "1015", registrationNumber: "CS27-0015", registrationDate: "2027-02-11T11:15:00Z", participantName: "Christian Morales", contactNumber: "09315566778", email: "christian.m@example.com", address: "77 Quirino St., Daraga, Albay", carMakeModel: "Nissan Silvia S15", plateNumber: "QRS 4567", registrationType: "Exhibitor", status: "Pending", registrationFee: 3500.00, amountPaid: 0.00, paymentStatus: "Unpaid" },
  { id: "1016", registrationNumber: "CS27-0016", registrationDate: "2027-02-11T13:10:00Z", participantName: "Katrina Soriano", contactNumber: "09326677889", email: "katrina.s@example.com", address: "29 Aguinaldo St., Sorsogon City", carMakeModel: "Mercedes-AMG A45", plateNumber: "TUV 6789", registrationType: "VIP", status: "Confirmed", registrationFee: 5000.00, amountPaid: 3000.00, paymentStatus: "Partial" },
  { id: "1017", registrationNumber: "CS27-0017", registrationDate: "2027-02-11T14:00:00Z", participantName: "Adrian Mercado", contactNumber: "09337788990", email: "adrian.m@example.com", address: "118 Lopez Jaena St., Legazpi City", carMakeModel: "Volkswagen Golf R", plateNumber: "WXY 8901", registrationType: "Competitor", status: "CheckedIn", registrationFee: 2500.00, amountPaid: 2500.00, paymentStatus: "Paid" },
  { id: "1018", registrationNumber: "CS27-0018", registrationDate: "2027-02-11T14:50:00Z", participantName: "Nicole Rivera", contactNumber: "09348899001", email: "nicole.r@example.com", address: "64 Gomez St., Sorsogon City", carMakeModel: "Mazda RX-7 FD", plateNumber: "ZAB 2345", registrationType: "Exhibitor", status: "Confirmed", registrationFee: 3500.00, amountPaid: 3500.00, paymentStatus: "Paid" },
  { id: "1019", registrationNumber: "CS27-0019", registrationDate: "2027-02-11T15:35:00Z", participantName: "Gabriel Velasco", contactNumber: "09359900112", email: "gabriel.v@example.com", address: "95 Roxas Ave., Naga City", carMakeModel: "Toyota Land Cruiser GR Sport", plateNumber: "CDE 6780", registrationType: "VIP", status: "Cancelled", registrationFee: 5000.00, amountPaid: 0.00, paymentStatus: "Unpaid" },
  { id: "1020", registrationNumber: "CS27-0020", registrationDate: "2027-02-12T08:40:00Z", participantName: "Cheska Ocampo", contactNumber: "09361011223", email: "cheska.o@example.com", address: "41 Burgos St., Sorsogon City", carMakeModel: "Mini Cooper JCW", plateNumber: "FGH 3451", registrationType: "Competitor", status: "Pending", registrationFee: 2500.00, amountPaid: 0.00, paymentStatus: "Unpaid" },
  { id: "1021", registrationNumber: "CS27-0021", registrationDate: "2027-02-12T09:30:00Z", participantName: "Joshua Evangelista", contactNumber: "09372122334", email: "joshua.e@example.com", address: "130 Rizal St., Sorsogon City", carMakeModel: "Subaru BRZ", plateNumber: "IJK 5672", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500.00, amountPaid: 2500.00, paymentStatus: "Paid" },
  { id: "1022", registrationNumber: "CS27-0022", registrationDate: "2027-02-12T10:20:00Z", participantName: "Alyssa Pascual", contactNumber: "09383233445", email: "alyssa.p@example.com", address: "18 Magsaysay Ave., Legazpi City", carMakeModel: "Chevrolet Camaro ZL1", plateNumber: "LMN 7893", registrationType: "VIP", status: "CheckedIn", registrationFee: 5000.00, amountPaid: 5000.00, paymentStatus: "Paid" },
  { id: "1023", registrationNumber: "CS27-0023", registrationDate: "2027-02-12T11:10:00Z", participantName: "Patrick Salvador", contactNumber: "09394344556", email: "patrick.s@example.com", address: "72 Quezon St., Sorsogon City", carMakeModel: "Honda Civic Si", plateNumber: "OPQ 9014", registrationType: "Exhibitor", status: "Confirmed", registrationFee: 3500.00, amountPaid: 1750.00, paymentStatus: "Partial" },
  { id: "1024", registrationNumber: "CS27-0024", registrationDate: "2027-02-12T13:25:00Z", participantName: "Mikaela Castillo", contactNumber: "09405455667", email: "mikaela.c@example.com", address: "105 Bonifacio St., Naga City", carMakeModel: "Toyota Corolla GR", plateNumber: "RST 1125", registrationType: "Competitor", status: "Confirmed", registrationFee: 2500.00, amountPaid: 2500.00, paymentStatus: "Paid" },
  { id: "1025", registrationNumber: "CS27-0025", registrationDate: "2027-02-12T14:15:00Z", participantName: "Kevin Guzman", contactNumber: "09416566778", email: "kevin.g@example.com", address: "8 Luna St., Sorsogon City", carMakeModel: "Audi R8 V10", plateNumber: "UVW 3346", registrationType: "VIP", status: "CheckedIn", registrationFee: 5000.00, amountPaid: 5000.00, paymentStatus: "Paid" }
];

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getRegistrations({
  participantName = "",
  type = "",
  status = "",
  page = 1,
  pageSize = 10,
} = {}) {
  await delay(250);

  const q = participantName.trim().toLowerCase();
  const filtered = SAMPLE_REGISTRATIONS.filter((item) => {
    const matchesName = !q || item.participantName.toLowerCase().includes(q);
    const matchesType = !type || type === "All" || item.registrationType === type;
    const matchesStatus = !status || status === "All" || item.status === status;
    return matchesName && matchesType && matchesStatus;
  });

  const safePageSize = Math.max(1, Number(pageSize) || 10);
  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / safePageSize));
  const safePage = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const startIndex = (safePage - 1) * safePageSize;
  const items = filtered.slice(startIndex, startIndex + safePageSize);

  return {
    items,
    page: safePage,
    pageSize: safePageSize,
    totalCount,
    totalPages,
  };
}

export async function getSummary() {
  await delay(200);

  const activeItems = SAMPLE_REGISTRATIONS.filter((r) => r.status !== "Cancelled");
  const totalRegistrations = SAMPLE_REGISTRATIONS.length;
  const confirmed = SAMPLE_REGISTRATIONS.filter((r) => r.status === "Confirmed").length;
  const checkedIn = SAMPLE_REGISTRATIONS.filter((r) => r.status === "CheckedIn").length;
  const pending = SAMPLE_REGISTRATIONS.filter((r) => r.status === "Pending").length;
  const cancelled = SAMPLE_REGISTRATIONS.filter((r) => r.status === "Cancelled").length;

  const totalFees = activeItems.reduce((sum, r) => sum + Number(r.registrationFee || 0), 0);
  const totalPayments = activeItems.reduce((sum, r) => sum + Number(r.amountPaid || 0), 0);
  const uncollectedPayments = Math.max(0, totalFees - totalPayments);

  return {
    totalRegistrations,
    confirmed,
    checkedIn,
    pending,
    cancelled,
    totalFees,
    totalPayments,
    uncollectedPayments,
  };
}
