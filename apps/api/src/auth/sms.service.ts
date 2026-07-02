/**
 * SMS Dispatcher
 *
 * Real SMS delivery is handled directly by the client via Firebase Phone Authentication service (`signInWithPhoneNumber`).
 * This service maintains the in-memory cache and server logging for session synchronization and local testing.
 */

// In-memory cache for instant development & testing retrieval
export const inHouseOtpCache = new Map<string, { code: string; timestamp: number }>();

export async function sendSmsOtp(phoneNumber: string, code: string): Promise<void> {
  // Store OTP in local memory cache for testing & synchronization
  inHouseOtpCache.set(phoneNumber, {
    code,
    timestamp: Date.now(),
  });

  // Always output cleanly to the server console
  console.log('\n========================================');
  console.log(`🔥 [OTP DISPATCH - FIREBASE SERVICE]`);
  console.log(`📱 Phone Number : ${phoneNumber}`);
  console.log(`🔑 Verification Code : ${code}`);
  console.log('========================================\n');
}
