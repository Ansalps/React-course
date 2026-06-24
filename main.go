package main

import (
	"fmt"
	"math"
	"time"
)

// func worker(start, end int, result *int64, wg *sync.WaitGroup) {
// 	defer wg.Done()

// 	var local int64

// 	for i := start; i < end; i++ {
// 		for j := 0; j < 100000; j++ {
// 			local += int64(i + j)
// 		}
// 	}

// 	*result = local
// }

// func main() {
// 	runtime.GOMAXPROCS(1)

// 	start := time.Now()

// 	var wg sync.WaitGroup

// 	var s1, s2 int64

// 	wg.Add(2)

// 	go worker(50000, 100000, &s2, &wg)

// 	worker(0, 50000, &s1, &wg)

// 	wg.Wait()

// 	total := s1 + s2

// 	fmt.Println("Sum is", total)
// 	fmt.Println("Execution took:", time.Since(start))
// }

// func main() {
// 	start := time.Now()
// 	var sum int64
// 	for i := 0; i < 100000; i++ {
// 		for j := 0; j < 100000; j++ {
// 			sum += int64(i + j)
// 		}
// 	}
// 	elapsed := time.Since(start)
// 	fmt.Println("Sum is ", sum)
// 	fmt.Println("Execution took:", elapsed)
// }

// func worker(start, end int) int64 {
// 	var local int64

// 	for i := start; i < end; i++ {
// 		for j := 0; j < 100000; j++ {
// 			local += int64(i + j)
// 		}
// 	}

// 	return local
// }

// func main() {
// 	start := time.Now()

// 	s1 := worker(0, 50000)
// 	s2 := worker(50000, 100000)

// 	total := s1 + s2

// 	fmt.Println(total)
// 	fmt.Println("Execution took:", time.Since(start))
// }

// You can edit this code!
// Click here and start typing.

// func main() {
// 	ch := make(chan int)

// 	go func() {
// 		fmt.Println("A")
// 		fmt.Println("B")
// 		var sum int
// 		time.Sleep(1 * time.Second)
// 		//ch <- 10
// 		fmt.Println(sum)
// 	}()
// 	go func ()  {
// 		time.Sleep(2*time.Second)
// 	}()
// 	go func ()  {
// 		time.Sleep(5*time.Second)
// 	}()
// 	go func(){
// 		time.Sleep(10*time.Second)
// 	}()

// 	fmt.Println(<-ch)
// 	fmt.Println("C")
// }

func main() {
	
	var sum int

	go func() {
		for i := 0; i < 10000; i++ {
			sum += i
		}

	}()
	go func() {
		for i := 10000; i < 20000; i++ {
			sum += i
		}
	}()

	time.Sleep(1 * time.Second)
	fmt.Println(sum)
}
