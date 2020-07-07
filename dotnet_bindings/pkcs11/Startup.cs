using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Net.Pkcs11Interop.Common;
using Net.Pkcs11Interop.HighLevelAPI;
using Net.Pkcs11Interop.HighLevelAPI.Factories;

namespace pkcs11
{
    public class Startup
    {
        static string Pkcs11LibraryPath = "/usr/local/lib/softhsm/libsofthsm2.so";

        public static async Task<object> GetSlots(dynamic input) {

            using (IPkcs11Library pkcs11Library = (new Pkcs11LibraryFactory()).LoadPkcs11Library(
                new Pkcs11InteropFactories(),
                Pkcs11LibraryPath,
                AppType.SingleThreaded))
            {
                // Get list of available slots
                List<ISlot> slots = pkcs11Library.GetSlotList(SlotsType.WithOrWithoutTokenPresent);
                return slots;
            }
        }
    }
}
