import net from "net"

export const isPortOpen = async (port: number): Promise<boolean> => {
	return new Promise((resolve) => {
			const s = net.createServer();
			s.once('error', (err: any) => {
					s.close();
					if (err["code"] === "EADDRINUSE") {
							resolve(false)
					} else {
							resolve(true)
					}
			});
			s.once('listening', () => {
					resolve(true);
					s.close();
			});
			s.listen(port);
	});
}