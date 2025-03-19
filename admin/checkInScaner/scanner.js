//Class for QR scanner with validation
//Will need to include this in the page: <script src="https://unpkg.com/html5-qrcode"></script>
const QRScanner = {
    scanner: null,
    isScanning: false,
    scanPromise: null,
    promiseResolve: null,
    ignoreScan: false,

    init: function(elementId) {
        this.scanner = new Html5Qrcode(elementId);
        return this; // For method chaining
    },

    //Checks if the qrcode scanned gives the correct user id format
    isValidScan: function(data) {
        if (data === null || typeof data !== 'string') {
            return false;
        }

        const pattern = /^user_[a-zA-Z0-9]{27}$/;
        return pattern.test(data);
    },

    scan: function() {
        if (!this.scanner) {
            return Promise.reject("Scanner not initialized. Call init() first.");
        }

        this.ignoreScan = false;

        // Create a new promise
        this.scanPromise = new Promise((resolve, reject) => {
            this.promiseResolve = resolve;

            const config = {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                formatsToSupport: [ Html5QrcodeSupportedFormats.QR_CODE ]
            };

            const handleSuccess = (decodedText, decodedResult) => {
                if (this.ignoreScan) {
                    return;
                }

                if (this.isValidScan(decodedText)) {
                    resolve(decodedText);
                    this.stop();
                }

                console.log("Invalid Scan:", decodedText);

                this.ignoreScan = true;

                setTimeout(() => {
                        this.ignoreScan = false;
                        console.log("Resuming scan");
                    },
                    1000);

            };

            // Error handler
            const handleError = (error) => {
                console.warn(`QR code scanning failed: ${error}`);
            };

            // Start scanning
            this.scanner.start(
                { facingMode: "environment" },
                config,
                handleSuccess,
                handleError
            ).then(() => {
                this.isScanning = true;
                console.log("Scanner started");
            }).catch((err) => {
                console.error("Error starting scanner:", err);
                reject(err);
            });
        });

        return this.scanPromise;
    },

    // Stop scanning
    stop: function() {
        if (this.scanner && this.isScanning) {
            this.scanner.stop().then(() => {
                this.isScanning = false;
            }).catch((err) => {
                console.error("Error stopping scanner:", err);
            });
        }
    }
};