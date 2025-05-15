/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
// In a migration file or setup script
export function createServerSupabaseClient() {
	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				async get(name: string) {
					return (await cookies()).get(name)?.value;
				},

				async set(name: string, value: string, options: any) {
					try {
						(await cookies()).set(name, value, options);
					} catch {}
				},
				async remove(name: string, options: any) {
					try {
						(await cookies()).delete(name);
					} catch {}
				},
			},
		}
	);
}

export async function getServerSession() {
	const supabase = createServerSupabaseClient();
	return await supabase.auth.getUser();
}




// const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

// async function createSubscriptionsTable() {
//   const { error } = await supabase.rpc('create_subscriptions_table', {}, { 
//     sql: `
//       CREATE TABLE IF NOT EXISTS subscriptions (
//         id SERIAL PRIMARY KEY,
//         subscription_id TEXT UNIQUE NOT NULL,
//         stripe_customer_id TEXT NOT NULL,
//         supabase_user_id UUID,
//         product_id TEXT,
//         price_id TEXT,
//         customer_email TEXT,
//         status TEXT,
//         trial_start TIMESTAMP WITH TIME ZONE,
//         trial_end TIMESTAMP WITH TIME ZONE,
//         current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
//         current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
//       );
//     `
//   })

//   if (error) console.error('Error creating subscriptions table:', error)
// }